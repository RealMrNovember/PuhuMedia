import { prisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import { services } from "@/lib/site-config";
import { servicesContent, type ServicePageContent } from "@/lib/services-content";

export function getAllServicePages() {
  return prisma.servicePage.findMany({
    orderBy: [{ order: "asc" }, { label: "asc" }],
  });
}

export function getPublishedServicePages() {
  return prisma.servicePage.findMany({
    where: { isPublished: true },
    orderBy: [{ order: "asc" }, { label: "asc" }],
  });
}

export function getServicePageBySlug(slug: string) {
  return prisma.servicePage.findUnique({ where: { slug } });
}

export function updateServicePage(
  slug: string,
  data: {
    label?: string;
    shortDescription?: string;
    category?: string;
    content?: Prisma.InputJsonValue;
    seoTitle?: string | null;
    seoDescription?: string | null;
    isPublished?: boolean;
    order?: number;
  }
) {
  return prisma.servicePage.update({ where: { slug }, data });
}

export function asServiceContent(raw: unknown): ServicePageContent | null {
  if (!raw || typeof raw !== "object") return null;
  const c = raw as Partial<ServicePageContent>;
  if (typeof c.heroTagline !== "string" || typeof c.heroDescription !== "string") {
    return null;
  }
  return {
    heroTagline: c.heroTagline,
    heroDescription: c.heroDescription,
    highlights: Array.isArray(c.highlights)
      ? c.highlights.filter((item): item is string => typeof item === "string")
      : [],
    overview: Array.isArray(c.overview)
      ? c.overview.filter((item): item is string => typeof item === "string")
      : [],
    features: Array.isArray(c.features)
      ? c.features
          .filter(
            (item): item is { title: string; description: string } =>
              !!item &&
              typeof item === "object" &&
              typeof (item as { title?: unknown }).title === "string" &&
              typeof (item as { description?: unknown }).description === "string"
          )
          .map((item) => ({ title: item.title, description: item.description }))
      : [],
    faqs: Array.isArray(c.faqs)
      ? c.faqs
          .filter(
            (item): item is { question: string; answer: string } =>
              !!item &&
              typeof item === "object" &&
              typeof (item as { question?: unknown }).question === "string" &&
              typeof (item as { answer?: unknown }).answer === "string"
          )
          .map((item) => ({ question: item.question, answer: item.answer }))
      : [],
  };
}

export type ResolvedServicePage = {
  slug: string;
  label: string;
  shortDescription: string;
  category: string;
  seoTitle: string | null;
  seoDescription: string | null;
  isPublished: boolean;
  content: ServicePageContent;
};

export async function resolveServicePage(slug: string): Promise<ResolvedServicePage | null> {
  const row = await prisma.servicePage.findFirst({
    where: { slug, isPublished: true },
  });

  if (row) {
    const content = asServiceContent(row.content);
    if (!content) return null;
    return {
      slug: row.slug,
      label: row.label,
      shortDescription: row.shortDescription,
      category: row.category,
      seoTitle: row.seoTitle,
      seoDescription: row.seoDescription,
      isPublished: row.isPublished,
      content,
    };
  }

  const fallback = services.find((s) => s.slug === slug);
  const content = servicesContent[slug];
  if (!fallback || !content) return null;

  return {
    slug: fallback.slug,
    label: fallback.label,
    shortDescription: fallback.shortDescription,
    category: fallback.category,
    seoTitle: fallback.label,
    seoDescription: content.heroDescription,
    isPublished: true,
    content,
  };
}
