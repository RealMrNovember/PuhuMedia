import { prisma } from "@/lib/db";

export function getActiveInstagramPosts(limit = 6) {
  return prisma.instagramPost.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    take: limit,
  });
}

export function getAllInstagramPosts() {
  return prisma.instagramPost.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}
