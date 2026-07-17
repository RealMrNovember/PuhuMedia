"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { saveUploadedFile } from "@/lib/upload";
import { isValidVideoUrl } from "@/lib/video-embed";

const slideSchema = z
  .object({
    title: z.string().trim().min(2).max(120),
    subtitle: z.string().trim().max(160).optional().or(z.literal("")),
    description: z.string().trim().max(400).optional().or(z.literal("")),
    mediaType: z.enum(["IMAGE", "VIDEO"]),
    videoUrl: z.string().trim().optional().or(z.literal("")),
    ctaLabel: z.string().trim().max(40).optional().or(z.literal("")),
    ctaLink: z.string().trim().max(200).optional().or(z.literal("")),
  })
  .refine(
    (data) => data.mediaType !== "VIDEO" || (data.videoUrl && isValidVideoUrl(data.videoUrl)),
    { message: "Geçerli bir YouTube video linki girin.", path: ["videoUrl"] }
  );

export type HeroSlideFormState = { error?: string; success?: boolean };

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !["SUPERADMIN", "ADMIN", "EDITOR"].includes(session.user.role)) {
    throw new Error("Yetkisiz erişim");
  }
}

function revalidateHeroPaths() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/hero-slider");
}

export async function createHeroSlideAction(
  _prevState: HeroSlideFormState,
  formData: FormData
): Promise<HeroSlideFormState> {
  await requireAdmin();

  const parsed = slideSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    mediaType: formData.get("mediaType"),
    videoUrl: formData.get("videoUrl"),
    ctaLabel: formData.get("ctaLabel"),
    ctaLink: formData.get("ctaLink"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  const { title, subtitle, description, mediaType, videoUrl, ctaLabel, ctaLink } = parsed.data;

  let imageUrl: string | null = null;
  if (mediaType === "IMAGE") {
    const file = formData.get("image");
    if (file instanceof File && file.size > 0) {
      try {
        imageUrl = await saveUploadedFile(file, "hero-slides");
      } catch (error) {
        return { error: error instanceof Error ? error.message : "Görsel yüklenemedi." };
      }
    } else {
      return { error: "Görsel tabanlı slayt için bir görsel yüklemelisiniz." };
    }
  }

  const count = await prisma.heroSlide.count();

  await prisma.heroSlide.create({
    data: {
      title,
      subtitle: subtitle || null,
      description: description || null,
      mediaType,
      imageUrl,
      videoUrl: mediaType === "VIDEO" ? videoUrl || null : null,
      ctaLabel: ctaLabel || null,
      ctaLink: ctaLink || null,
      order: count,
    },
  });

  revalidateHeroPaths();
  return { success: true };
}

export async function updateHeroSlideAction(
  id: string,
  _prevState: HeroSlideFormState,
  formData: FormData
): Promise<HeroSlideFormState> {
  await requireAdmin();

  const parsed = slideSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    mediaType: formData.get("mediaType"),
    videoUrl: formData.get("videoUrl"),
    ctaLabel: formData.get("ctaLabel"),
    ctaLink: formData.get("ctaLink"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  const { title, subtitle, description, mediaType, videoUrl, ctaLabel, ctaLink } = parsed.data;
  const existing = await prisma.heroSlide.findUniqueOrThrow({ where: { id } });

  let imageUrl = existing.imageUrl;
  if (mediaType === "IMAGE") {
    const file = formData.get("image");
    if (file instanceof File && file.size > 0) {
      try {
        imageUrl = await saveUploadedFile(file, "hero-slides");
      } catch (error) {
        return { error: error instanceof Error ? error.message : "Görsel yüklenemedi." };
      }
    } else if (!existing.imageUrl) {
      return { error: "Görsel tabanlı slayt için bir görsel yüklemelisiniz." };
    }
  }

  await prisma.heroSlide.update({
    where: { id },
    data: {
      title,
      subtitle: subtitle || null,
      description: description || null,
      mediaType,
      imageUrl: mediaType === "IMAGE" ? imageUrl : null,
      videoUrl: mediaType === "VIDEO" ? videoUrl || null : null,
      ctaLabel: ctaLabel || null,
      ctaLink: ctaLink || null,
    },
  });

  revalidateHeroPaths();
  return { success: true };
}

export async function deleteHeroSlideAction(id: string) {
  await requireAdmin();
  await prisma.heroSlide.delete({ where: { id } });
  revalidateHeroPaths();
}

export async function toggleHeroSlideAction(id: string, isActive: boolean) {
  await requireAdmin();
  await prisma.heroSlide.update({ where: { id }, data: { isActive } });
  revalidateHeroPaths();
}

export async function moveHeroSlideAction(id: string, direction: "up" | "down") {
  await requireAdmin();

  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  const index = slides.findIndex((s) => s.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= slides.length) return;

  const current = slides[index];
  const swapWith = slides[swapIndex];

  await prisma.$transaction([
    prisma.heroSlide.update({ where: { id: current.id }, data: { order: swapWith.order } }),
    prisma.heroSlide.update({ where: { id: swapWith.id }, data: { order: current.order } }),
  ]);

  revalidateHeroPaths();
}
