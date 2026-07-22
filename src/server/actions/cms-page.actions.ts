"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CONTENT_ROLES } from "@/lib/admin/permissions";
import { requireRole } from "@/lib/admin/require-session";
import { prisma } from "@/lib/db";

export type CmsPageFormState = { error?: string; success?: boolean };

function revalidate(slug: string) {
  revalidatePath("/admin/sayfalar");
  revalidatePath(`/admin/sayfalar/${slug}`);
  if (slug === "hakkimizda") revalidatePath("/hakkimizda");
  else revalidatePath(`/${slug}`);
}

export async function updateAboutPageAction(
  _prev: CmsPageFormState,
  formData: FormData
): Promise<CmsPageFormState> {
  await requireRole(CONTENT_ROLES);

  const title = String(formData.get("title") ?? "").trim();
  const seoTitle = String(formData.get("seoTitle") ?? "").trim();
  const seoDescription = String(formData.get("seoDescription") ?? "").trim();
  const heroTitle = String(formData.get("heroTitle") ?? "").trim();
  const heroBody = String(formData.get("heroBody") ?? "").trim();
  const mission = String(formData.get("mission") ?? "").trim();
  const vision = String(formData.get("vision") ?? "").trim();

  if (heroTitle.length < 2 || heroBody.length < 2) {
    return { error: "Hero başlık ve metin zorunludur." };
  }

  const valueTitles = formData.getAll("valueTitle").map(String);
  const valueDescriptions = formData.getAll("valueDescription").map(String);
  const values = valueTitles
    .map((t, i) => ({
      title: t.trim(),
      description: (valueDescriptions[i] ?? "").trim(),
    }))
    .filter((v) => v.title && v.description);

  await prisma.cmsPage.upsert({
    where: { slug: "hakkimizda" },
    create: {
      slug: "hakkimizda",
      title: title || "Hakkımızda",
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      content: { heroTitle, heroBody, mission, vision, values },
    },
    update: {
      title: title || "Hakkımızda",
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      content: { heroTitle, heroBody, mission, vision, values },
    },
  });

  revalidate("hakkimizda");
  return { success: true };
}

const legalSchema = z.object({
  title: z.string().trim().min(2).max(200),
  seoTitle: z.string().trim().max(200).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(300).optional().or(z.literal("")),
  html: z.string().trim().min(2),
});

export async function updateLegalPageAction(
  slug: string,
  _prev: CmsPageFormState,
  formData: FormData
): Promise<CmsPageFormState> {
  await requireRole(CONTENT_ROLES);
  if (!["kvkk", "gizlilik-politikasi", "cerez-politikasi"].includes(slug)) {
    return { error: "Geçersiz sayfa." };
  }

  const parsed = legalSchema.safeParse({
    title: formData.get("title"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    html: formData.get("html"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  await prisma.cmsPage.upsert({
    where: { slug },
    create: {
      slug,
      title: parsed.data.title,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      content: { html: parsed.data.html },
    },
    update: {
      title: parsed.data.title,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      content: { html: parsed.data.html },
    },
  });

  revalidate(slug);
  return { success: true };
}
