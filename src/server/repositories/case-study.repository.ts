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

export function getAllCaseStudies() {
  return prisma.caseStudy.findMany({
    orderBy: { updatedAt: "desc" },
    include: { reference: true },
  });
}

export function getCaseStudyById(id: string) {
  return prisma.caseStudy.findUnique({
    where: { id },
    include: { reference: true },
  });
}

export function countCaseStudies() {
  return prisma.caseStudy.count();
}

