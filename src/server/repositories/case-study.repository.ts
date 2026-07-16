import { prisma } from "@/lib/db";

export function getPublishedCaseStudies(limit = 6) {
  return prisma.caseStudy.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export function getCaseStudyBySlug(slug: string) {
  return prisma.caseStudy.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
}
