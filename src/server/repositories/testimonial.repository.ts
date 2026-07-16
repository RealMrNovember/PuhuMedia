import { prisma } from "@/lib/db";

export function getPublishedTestimonials(limit = 6) {
  return prisma.testimonial.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    take: limit,
  });
}
