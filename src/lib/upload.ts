import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export async function saveUploadedFile(
  file: File,
  subdir: string
): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Desteklenmeyen dosya türü. PDF, JPG, PNG veya WEBP yükleyin.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Dosya boyutu 10MB'ı aşamaz.");
  }

  const ext = path.extname(file.name).toLowerCase() || "";
  const filename = `${randomUUID()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", subdir);
  await mkdir(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${subdir}/${filename}`;
}
