"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { CONTENT_ROLES, type Role } from "@/lib/admin/permissions";
import { requireRole, requireSession } from "@/lib/admin/require-session";
import {
  countSuperadmins,
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from "@/server/repositories/user.repository";

export type UserFormState = { error?: string; success?: boolean };

const roleSchema = z.enum(["SUPERADMIN", "ADMIN", "EDITOR", "AUTHOR"]);

const createSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email(),
  password: z.string().min(8).max(100),
  role: roleSchema,
});

const updateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email(),
  role: roleSchema,
  password: z.string().min(8).max(100).optional().or(z.literal("")),
});

const profileSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Yeni şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

function revalidateUserPaths() {
  revalidatePath("/admin/kullanicilar");
  revalidatePath("/admin/profil");
}

export async function createUserAction(
  _prev: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  await requireRole(["SUPERADMIN"]);

  const parsed = createSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  const existing = await getUserByEmail(parsed.data.email);
  if (existing) return { error: "Bu e-posta adresi zaten kullanılıyor." };

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await createUser({
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash,
    role: parsed.data.role as Role,
  });

  revalidateUserPaths();
  return { success: true };
}

export async function updateUserAction(
  id: string,
  _prev: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  await requireRole(["SUPERADMIN"]);

  const parsed = updateSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  const user = await getUserById(id);
  if (!user) return { error: "Kullanıcı bulunamadı." };

  if (user.role === "SUPERADMIN" && parsed.data.role !== "SUPERADMIN") {
    const count = await countSuperadmins();
    if (count <= 1) {
      return { error: "Son süper yönetici rolü değiştirilemez." };
    }
  }

  const emailOwner = await getUserByEmail(parsed.data.email);
  if (emailOwner && emailOwner.id !== id) {
    return { error: "Bu e-posta adresi zaten kullanılıyor." };
  }

  const data: {
    name: string;
    email: string;
    role: Role;
    passwordHash?: string;
  } = {
    name: parsed.data.name,
    email: parsed.data.email,
    role: parsed.data.role as Role,
  };

  if (parsed.data.password) {
    data.passwordHash = await bcrypt.hash(parsed.data.password, 12);
  }

  await updateUser(id, data);
  revalidateUserPaths();
  return { success: true };
}

export async function toggleUserActiveAction(id: string, isActive: boolean) {
  const session = await requireRole(["SUPERADMIN"]);
  const user = await getUserById(id);
  if (!user) throw new Error("Kullanıcı bulunamadı.");

  if (!isActive && user.role === "SUPERADMIN") {
    const count = await countSuperadmins();
    if (count <= 1) throw new Error("Son süper yönetici pasifleştirilemez.");
  }

  if (!isActive && user.id === session.user.id) {
    throw new Error("Kendi hesabınızı pasifleştiremezsiniz.");
  }

  await updateUser(id, { isActive });
  revalidateUserPaths();
}

export async function deleteUserAction(id: string) {
  const session = await requireRole(["SUPERADMIN"]);
  const user = await getUserById(id);
  if (!user) throw new Error("Kullanıcı bulunamadı.");

  if (user.id === session.user.id) {
    throw new Error("Kendi hesabınızı silemezsiniz.");
  }

  if (user.role === "SUPERADMIN") {
    const count = await countSuperadmins();
    if (count <= 1) throw new Error("Son süper yönetici silinemez.");
  }

  await deleteUser(id);
  revalidateUserPaths();
}

export async function updateProfileAction(
  _prev: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const session = await requireSession();
  if (!CONTENT_ROLES.includes(session.user.role as Role)) {
    return { error: "Yetkisiz erişim." };
  }

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  const emailOwner = await getUserByEmail(parsed.data.email);
  if (emailOwner && emailOwner.id !== session.user.id) {
    return { error: "Bu e-posta adresi zaten kullanılıyor." };
  }

  await updateUser(session.user.id, {
    name: parsed.data.name,
    email: parsed.data.email,
  });

  revalidateUserPaths();
  return { success: true };
}

export async function changePasswordAction(
  _prev: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const session = await requireSession();

  const parsed = passwordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  const user = await getUserById(session.user.id);
  if (!user) return { error: "Kullanıcı bulunamadı." };

  const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
  if (!valid) return { error: "Mevcut şifre hatalı." };

  const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
  await updateUser(user.id, { passwordHash });

  revalidateUserPaths();
  return { success: true };
}
