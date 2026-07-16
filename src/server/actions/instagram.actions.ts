"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const urlSchema = z.url().refine((url) => url.includes("instagram.com"), {
  message: "Geçerli bir Instagram gönderi linki girin.",
});

export type InstagramFormState = { error?: string };

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !["SUPERADMIN", "ADMIN", "EDITOR"].includes(session.user.role)) {
    throw new Error("Yetkisiz erişim");
  }
  return session.user;
}

export async function addInstagramPostAction(
  _prevState: InstagramFormState,
  formData: FormData
): Promise<InstagramFormState> {
  await requireAdmin();

  const parsed = urlSchema.safeParse(formData.get("url"));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz link." };
  }

  const count = await prisma.instagramPost.count();

  await prisma.instagramPost.create({
    data: {
      url: parsed.data,
      caption: (formData.get("caption") as string) || null,
      order: count,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/instagram");

  return {};
}

export async function deleteInstagramPostAction(id: string) {
  await requireAdmin();
  await prisma.instagramPost.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/admin/instagram");
}

export async function toggleInstagramPostAction(id: string, isActive: boolean) {
  await requireAdmin();
  await prisma.instagramPost.update({ where: { id }, data: { isActive } });
  revalidatePath("/", "layout");
  revalidatePath("/admin/instagram");
}
