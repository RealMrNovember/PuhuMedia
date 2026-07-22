"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CONTENT_ROLES } from "@/lib/admin/permissions";
import { requireRole } from "@/lib/admin/require-session";
import { saveUploadedFile } from "@/lib/upload";
import { prisma } from "@/lib/db";

export type TestimonialFormState = { error?: string; success?: boolean };

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(120),
  quote: z.string().trim().min(2).max(2000),
  rating: z.coerce.number().int().min(1).max(5),
});

function revalidate() {
  revalidatePath("/admin/yorumlar");
  revalidatePath("/");
}

export async function createTestimonialAction(
  _prev: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireRole(CONTENT_ROLES);
  const parsed = schema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    company: formData.get("company"),
    quote: formData.get("quote"),
    rating: formData.get("rating") || 5,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  let photo: string | null = null;
  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) {
    try {
      photo = await saveUploadedFile(file, "media");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Fotoğraf yüklenemedi." };
    }
  }

  const count = await prisma.testimonial.count();
  await prisma.testimonial.create({
    data: { ...parsed.data, photo, order: count },
  });
  revalidate();
  return { success: true };
}

export async function updateTestimonialAction(
  id: string,
  _prev: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireRole(CONTENT_ROLES);
  const parsed = schema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    company: formData.get("company"),
    quote: formData.get("quote"),
    rating: formData.get("rating") || 5,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const current = await prisma.testimonial.findUniqueOrThrow({ where: { id } });
  let photo = current.photo;
  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) {
    try {
      photo = await saveUploadedFile(file, "media");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Fotoğraf yüklenemedi." };
    }
  }

  await prisma.testimonial.update({
    where: { id },
    data: { ...parsed.data, photo },
  });
  revalidate();
  return { success: true };
}

export async function deleteTestimonialAction(id: string) {
  await requireRole(["SUPERADMIN", "ADMIN", "EDITOR"]);
  await prisma.testimonial.delete({ where: { id } });
  revalidate();
}

export async function toggleTestimonialAction(id: string, isPublished: boolean) {
  await requireRole(CONTENT_ROLES);
  await prisma.testimonial.update({ where: { id }, data: { isPublished } });
  revalidate();
}

export async function moveTestimonialAction(id: string, direction: "up" | "down") {
  await requireRole(CONTENT_ROLES);
  const items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return;
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= items.length) return;
  const current = items[index];
  const swapWith = items[swapIndex];
  await prisma.$transaction([
    prisma.testimonial.update({
      where: { id: current.id },
      data: { order: swapWith.order },
    }),
    prisma.testimonial.update({
      where: { id: swapWith.id },
      data: { order: current.order },
    }),
  ]);
  revalidate();
}
