import { prisma } from "@/lib/db";

export function getPublishedBlogPosts(limit = 3) {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: { category: true },
  });
}

export function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { category: true, tags: true, author: true },
  });
}
