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

export function getAllBlogPosts() {
  return prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
    include: { author: true, category: true },
  });
}

export function getBlogPostById(id: string) {
  return prisma.blogPost.findUnique({
    where: { id },
    include: { author: true, category: true, tags: true },
  });
}

export function countBlogPosts() {
  return prisma.blogPost.count();
}

