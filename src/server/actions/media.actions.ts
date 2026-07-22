"use server";

import { revalidatePath } from "next/cache";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { CONTENT_ROLES } from "@/lib/admin/permissions";
import { requireRole } from "@/lib/admin/require-session";
import { saveUploadedFile } from "@/lib/upload";
import {
  createMedia,
  deleteMedia,
  getMediaById,
  updateMediaAlt,
} from "@/server/repositories/media.repository";

export type MediaFormState = { error?: string; success?: boolean };

function revalidateMedia() {
  revalidatePath("/admin/medya");
}

export async function uploadMediaAction(
  _prev: MediaFormState,
  formData: FormData
): Promise<MediaFormState> {
  await requireRole(CONTENT_ROLES);

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Dosya seçmelisiniz." };
  }

  const alt = String(formData.get("alt") ?? "").trim();

  try {
    const filePath = await saveUploadedFile(file, "media");
    await createMedia({
      filename: file.name,
      path: filePath,
      mimeType: file.type,
      size: file.size,
      alt: alt || null,
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Yükleme başarısız." };
  }

  revalidateMedia();
  return { success: true };
}

export async function updateMediaAltAction(
  id: string,
  _prev: MediaFormState,
  formData: FormData
): Promise<MediaFormState> {
  await requireRole(CONTENT_ROLES);

  const parsed = z
    .object({ alt: z.string().trim().max(300).optional().or(z.literal("")) })
    .safeParse({ alt: formData.get("alt") });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz veri." };
  }

  await updateMediaAlt(id, parsed.data.alt || null);
  revalidateMedia();
  return { success: true };
}

export async function deleteMediaAction(id: string) {
  await requireRole(CONTENT_ROLES);
  const media = await getMediaById(id);
  if (!media) return;

  await deleteMedia(id);

  if (media.path.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", media.path));
    } catch {
      // file may already be missing
    }
  }

  revalidateMedia();
}
