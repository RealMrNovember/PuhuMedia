"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CONTENT_ROLES } from "@/lib/admin/permissions";
import { requireRole } from "@/lib/admin/require-session";
import { prisma } from "@/lib/db";
import type { ServicePageContent } from "@/lib/services-content";

export type ServicePageFormState = { error?: string; success?: boolean };

const schema = z.object({
  label: z.string().trim().min(2).max(160),
  shortDescription: z.string().trim().min(2).max(300),
  category: z.string().trim().min(2).max(80),
  seoTitle: z.string().trim().max(200).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(400).optional().or(z.literal("")),
  heroTagline: z.string().trim().min(2).max(160),
  heroDescription: z.string().trim().min(2).max(800),
  highlights: z.string().trim(),
  overview: z.string().trim(),
});

function parsePairs(titles: FormDataEntryValue[], descriptions: FormDataEntryValue[]) {
  return titles
    .map((t, i) => ({
      title: String(t).trim(),
      description: String(descriptions[i] ?? "").trim(),
    }))
    .filter((item) => item.title && item.description);
}

function parseFaqs(questions: FormDataEntryValue[], answers: FormDataEntryValue[]) {
  return questions
    .map((q, i) => ({
      question: String(q).trim(),
      answer: String(answers[i] ?? "").trim(),
    }))
    .filter((item) => item.question && item.answer);
}

export async function updateServicePageAction(
  slug: string,
  _prev: ServicePageFormState,
  formData: FormData
): Promise<ServicePageFormState> {
  await requireRole(CONTENT_ROLES);

  const parsed = schema.safeParse({
    label: formData.get("label"),
    shortDescription: formData.get("shortDescription"),
    category: formData.get("category"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    heroTagline: formData.get("heroTagline"),
    heroDescription: formData.get("heroDescription"),
    highlights: formData.get("highlights") ?? "",
    overview: formData.get("overview") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const content: ServicePageContent = {
    heroTagline: parsed.data.heroTagline,
    heroDescription: parsed.data.heroDescription,
    highlights: parsed.data.highlights
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    overview: parsed.data.overview
      .split("\n\n")
      .map((block) => block.trim())
      .filter(Boolean),
    features: parsePairs(
      formData.getAll("featureTitle"),
      formData.getAll("featureDescription")
    ),
    faqs: parseFaqs(formData.getAll("faqQuestion"), formData.getAll("faqAnswer")),
  };

  const isPublished = formData.get("isPublished") !== "false";

  await prisma.servicePage.upsert({
    where: { slug },
    create: {
      slug,
      label: parsed.data.label,
      shortDescription: parsed.data.shortDescription,
      category: parsed.data.category,
      content,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      isPublished,
    },
    update: {
      label: parsed.data.label,
      shortDescription: parsed.data.shortDescription,
      category: parsed.data.category,
      content,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      isPublished,
    },
  });

  revalidatePath("/admin/hizmetler");
  revalidatePath(`/admin/hizmetler/${slug}`);
  revalidatePath(`/hizmetler/${slug}`);
  revalidatePath("/");
  return { success: true };
}

export async function toggleServicePageAction(slug: string, isPublished: boolean) {
  await requireRole(CONTENT_ROLES);
  await prisma.servicePage.update({ where: { slug }, data: { isPublished } });
  revalidatePath("/admin/hizmetler");
  revalidatePath(`/hizmetler/${slug}`);
  revalidatePath("/");
}
