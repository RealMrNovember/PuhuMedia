import { prisma } from "@/lib/db";

export function getPublishedFaqs(limit?: number) {
  return prisma.fAQ.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    take: limit,
  });
}

export function getAllFaqs() {
  return prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });
}

export function getFaqById(id: string) {
  return prisma.fAQ.findUnique({ where: { id } });
}

export function countFaqs() {
  return prisma.fAQ.count();
}

