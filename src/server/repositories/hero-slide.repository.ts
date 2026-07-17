import { prisma } from "@/lib/db";

export function getActiveHeroSlides() {
  return prisma.heroSlide.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export function getAllHeroSlides() {
  return prisma.heroSlide.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export function getHeroSlideById(id: string) {
  return prisma.heroSlide.findUnique({ where: { id } });
}
