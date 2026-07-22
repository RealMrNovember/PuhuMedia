import { prisma } from "@/lib/db";

export function getPublishedReferences(limit = 12) {
  return prisma.reference.findMany({
    where: { isPublished: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: limit,
  });
}

export function getFeaturedReferences(limit = 8) {
  return prisma.reference.findMany({
    where: { isPublished: true, isFeatured: true },
    orderBy: { order: "asc" },
    take: limit,
  });
}

export function getAllReferences() {
  return prisma.reference.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export function getReferenceById(id: string) {
  return prisma.reference.findUnique({ where: { id } });
}

export function countReferences() {
  return prisma.reference.count();
}

