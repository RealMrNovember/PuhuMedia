import { prisma } from "@/lib/db";

export function getPublishedTestimonials(limit = 6) {
  return prisma.testimonial.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    take: limit,
  });
}

export function getAllTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });
}

export function getTestimonialById(id: string) {
  return prisma.testimonial.findUnique({ where: { id } });
}

export function countTestimonials() {
  return prisma.testimonial.count();
}

