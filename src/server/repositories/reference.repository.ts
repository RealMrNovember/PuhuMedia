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
