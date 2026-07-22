"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CONTENT_ROLES } from "@/lib/admin/permissions";
import { requireRole } from "@/lib/admin/require-session";
import { slugify } from "@/lib/admin/slugify";
import { saveUploadedFile } from "@/lib/upload";
import { prisma } from "@/lib/db";

export type ReferenceFormState = { error?: string; success?: boolean; id?: string };

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().max(140).optional().or(z.literal("")),
  sector: z.string().trim().min(2).max(120),
  description: z.string().trim().min(2).max(2000),
  results: z.string().trim().max(2000).optional().or(z.literal("")),
  servicesUsed: z.string().trim().optional().or(z.literal("")),
  isFeatured: z.enum(["true", "false"]).optional(),
  isPublished: z.enum(["true", "false"]).optional(),
});

function revalidate() {
  revalidatePath("/admin/referanslar");
  revalidatePath("/referanslar");
  revalidatePath("/");
}

export async function createReferenceAction(
  _prev: ReferenceFormState,
  formData: FormData
): Promise<ReferenceFormState> {
  await requireRole(CONTENT_ROLES);
  const parsed = schema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    sector: formData.get("sector"),
    description: formData.get("description"),
    results: formData.get("results"),
    servicesUsed: formData.get("servicesUsed"),
    isFeatured: formData.get("isFeatured") || "false",
    isPublished: formData.get("isPublished") || "true",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const slug = parsed.data.slug || slugify(parsed.data.name);
  if (await prisma.reference.findUnique({ where: { slug } })) {
    return { error: "Bu slug zaten kullanılıyor." };
  }

  const file = formData.get("logo");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Logo yüklemelisiniz." };
  }
  let logo: string;
  try {
    logo = await saveUploadedFile(file, "references");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Logo yüklenemedi." };
  }

  const count = await prisma.reference.count();
  const row = await prisma.reference.create({
    data: {
      name: parsed.data.name,
      slug,
      logo,
      sector: parsed.data.sector,
      description: parsed.data.description,
      results: parsed.data.results || null,
      servicesUsed: parsed.data.servicesUsed
        ? parsed.data.servicesUsed.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      gallery: [],
      order: count,
      isFeatured: parsed.data.isFeatured === "true",
      isPublished: parsed.data.isPublished !== "false",
    },
  });

  revalidate();
  return { success: true, id: row.id };
}

export async function updateReferenceAction(
  id: string,
  _prev: ReferenceFormState,
  formData: FormData
): Promise<ReferenceFormState> {
  await requireRole(CONTENT_ROLES);
  const parsed = schema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    sector: formData.get("sector"),
    description: formData.get("description"),
    results: formData.get("results"),
    servicesUsed: formData.get("servicesUsed"),
    isFeatured: formData.get("isFeatured") || "false",
    isPublished: formData.get("isPublished") || "true",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const current = await prisma.reference.findUniqueOrThrow({ where: { id } });
  const slug = parsed.data.slug || slugify(parsed.data.name);
  if (slug !== current.slug) {
    if (await prisma.reference.findUnique({ where: { slug } })) {
      return { error: "Bu slug zaten kullanılıyor." };
    }
  }

  let logo = current.logo;
  const file = formData.get("logo");
  if (file instanceof File && file.size > 0) {
    try {
      logo = await saveUploadedFile(file, "references");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Logo yüklenemedi." };
    }
  }

  await prisma.reference.update({
    where: { id },
    data: {
      name: parsed.data.name,
      slug,
      logo,
      sector: parsed.data.sector,
      description: parsed.data.description,
      results: parsed.data.results || null,
      servicesUsed: parsed.data.servicesUsed
        ? parsed.data.servicesUsed.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      isFeatured: parsed.data.isFeatured === "true",
      isPublished: parsed.data.isPublished !== "false",
    },
  });

  revalidate();
  return { success: true, id };
}

export async function deleteReferenceAction(id: string) {
  await requireRole(["SUPERADMIN", "ADMIN", "EDITOR"]);
  await prisma.reference.delete({ where: { id } });
  revalidate();
}

export async function toggleReferenceAction(id: string, isPublished: boolean) {
  await requireRole(CONTENT_ROLES);
  await prisma.reference.update({ where: { id }, data: { isPublished } });
  revalidate();
}
