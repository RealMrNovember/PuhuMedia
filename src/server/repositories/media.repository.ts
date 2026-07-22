import { prisma } from "@/lib/db";

export function getAllMedia() {
  return prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function getMediaById(id: string) {
  return prisma.mediaAsset.findUnique({ where: { id } });
}

export function createMedia(data: {
  filename: string;
  path: string;
  mimeType: string;
  size: number;
  width?: number | null;
  height?: number | null;
  alt?: string | null;
}) {
  return prisma.mediaAsset.create({ data });
}

export function updateMediaAlt(id: string, alt: string | null) {
  return prisma.mediaAsset.update({ where: { id }, data: { alt } });
}

export function deleteMedia(id: string) {
  return prisma.mediaAsset.delete({ where: { id } });
}

export function countMedia() {
  return prisma.mediaAsset.count();
}
