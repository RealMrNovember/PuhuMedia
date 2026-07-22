import { prisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";

export type AboutPageContent = {
  heroTitle: string;
  heroBody: string;
  mission: string;
  vision: string;
  values: { title: string; description: string }[];
};

export type LegalPageContent = {
  html: string;
};

export function getAllCmsPages() {
  return prisma.cmsPage.findMany({
    orderBy: { title: "asc" },
  });
}

export function getCmsPageBySlug(slug: string) {
  return prisma.cmsPage.findUnique({ where: { slug } });
}

export function updateCmsPage(
  slug: string,
  data: {
    title?: string;
    excerpt?: string | null;
    content?: Prisma.InputJsonValue;
    seoTitle?: string | null;
    seoDescription?: string | null;
  }
) {
  return prisma.cmsPage.update({ where: { slug }, data });
}

export function asAboutContent(raw: unknown): AboutPageContent | null {
  if (!raw || typeof raw !== "object") return null;
  const c = raw as Partial<AboutPageContent>;
  if (typeof c.heroTitle !== "string" || typeof c.heroBody !== "string") return null;
  return {
    heroTitle: c.heroTitle,
    heroBody: c.heroBody,
    mission: typeof c.mission === "string" ? c.mission : "",
    vision: typeof c.vision === "string" ? c.vision : "",
    values: Array.isArray(c.values)
      ? c.values
          .filter(
            (v): v is { title: string; description: string } =>
              !!v &&
              typeof v === "object" &&
              typeof (v as { title?: unknown }).title === "string" &&
              typeof (v as { description?: unknown }).description === "string"
          )
          .map((v) => ({ title: v.title, description: v.description }))
      : [],
  };
}

export function asLegalContent(raw: unknown): LegalPageContent | null {
  if (!raw || typeof raw !== "object") return null;
  const c = raw as { html?: unknown };
  if (typeof c.html !== "string") return null;
  return { html: c.html };
}
