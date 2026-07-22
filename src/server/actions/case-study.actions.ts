"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CONTENT_ROLES } from "@/lib/admin/permissions";
import { requireRole } from "@/lib/admin/require-session";
import { slugify } from "@/lib/admin/slugify";
import { saveUploadedFile } from "@/lib/upload";
import { prisma } from "@/lib/db";

export type CaseStudyFormState = { error?: string; success?: boolean; id?: string };

const schema = z.object({
  title: z.string().trim().min(2).max(200),
  slug: z.string().trim().max(220).optional().or(z.literal("")),
  client: z.string().trim().min(1).max(120),
  sector: z.string().trim().min(1).max(120),
  problem: z.string().trim().min(2),
  solution: z.string().trim().min(2),
  strategy: z.string().trim().min(2),
  process: z.string().trim().min(2),
  resultsText: z.string().trim().optional().or(z.literal("")),
  ctaText: z.string().trim().max(120).optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED"]),
  seoTitle: z.string().trim().max(200).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(300).optional().or(z.literal("")),
});

function revalidate(slug?: string) {
  revalidatePath("/admin/case-studies");
  revalidatePath("/");
  if (slug) revalidatePath(`/case-studies/${slug}`);
}

export async function createCaseStudyAction(
  _prev: CaseStudyFormState,
  formData: FormData
): Promise<CaseStudyFormState> {
  await requireRole(CONTENT_ROLES);
  const parsed = schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    client: formData.get("client"),
    sector: formData.get("sector"),
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    strategy: formData.get("strategy"),
    process: formData.get("process"),
    resultsText: formData.get("resultsText"),
    ctaText: formData.get("ctaText"),
    status: formData.get("status") || "DRAFT",
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const slug = parsed.data.slug || slugify(parsed.data.title);
  if (await prisma.caseStudy.findUnique({ where: { slug } })) {
    return { error: "Bu slug zaten kullanılıyor." };
  }

  const file = formData.get("coverImage");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Kapak görseli gerekli." };
  }
  let coverImage: string;
  try {
    coverImage = await saveUploadedFile(file, "media");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Görsel yüklenemedi." };
  }

  const results = parsed.data.resultsText
    ? parsed.data.resultsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  const row = await prisma.caseStudy.create({
    data: {
      title: parsed.data.title,
      slug,
      client: parsed.data.client,
      sector: parsed.data.sector,
      coverImage,
      problem: parsed.data.problem,
      solution: parsed.data.solution,
      strategy: parsed.data.strategy,
      process: parsed.data.process,
      results,
      gallery: [],
      ctaText: parsed.data.ctaText || null,
      status: parsed.data.status,
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
    },
  });

  revalidate(slug);
  return { success: true, id: row.id };
}

export async function updateCaseStudyAction(
  id: string,
  _prev: CaseStudyFormState,
  formData: FormData
): Promise<CaseStudyFormState> {
  await requireRole(CONTENT_ROLES);
  const parsed = schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    client: formData.get("client"),
    sector: formData.get("sector"),
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    strategy: formData.get("strategy"),
    process: formData.get("process"),
    resultsText: formData.get("resultsText"),
    ctaText: formData.get("ctaText"),
    status: formData.get("status") || "DRAFT",
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const current = await prisma.caseStudy.findUniqueOrThrow({ where: { id } });
  const slug = parsed.data.slug || slugify(parsed.data.title);
  if (slug !== current.slug) {
    if (await prisma.caseStudy.findUnique({ where: { slug } })) {
      return { error: "Bu slug zaten kullanılıyor." };
    }
  }

  let coverImage = current.coverImage;
  const file = formData.get("coverImage");
  if (file instanceof File && file.size > 0) {
    try {
      coverImage = await saveUploadedFile(file, "media");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Görsel yüklenemedi." };
    }
  }

  const results = parsed.data.resultsText
    ? parsed.data.resultsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  await prisma.caseStudy.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug,
      client: parsed.data.client,
      sector: parsed.data.sector,
      coverImage,
      problem: parsed.data.problem,
      solution: parsed.data.solution,
      strategy: parsed.data.strategy,
      process: parsed.data.process,
      results,
      ctaText: parsed.data.ctaText || null,
      status: parsed.data.status,
      publishedAt:
        parsed.data.status === "PUBLISHED"
          ? current.publishedAt ?? new Date()
          : current.publishedAt,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
    },
  });

  revalidate(slug);
  return { success: true, id };
}

export async function deleteCaseStudyAction(id: string) {
  await requireRole(["SUPERADMIN", "ADMIN", "EDITOR"]);
  const row = await prisma.caseStudy.delete({ where: { id } });
  revalidate(row.slug);
}
