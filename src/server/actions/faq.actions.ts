"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CONTENT_ROLES } from "@/lib/admin/permissions";
import { requireRole } from "@/lib/admin/require-session";
import { prisma } from "@/lib/db";

export type FaqFormState = { error?: string; success?: boolean };

const schema = z.object({
  question: z.string().trim().min(2).max(300),
  answer: z.string().trim().min(2).max(4000),
  category: z.string().trim().max(100).optional().or(z.literal("")),
});

function revalidate() {
  revalidatePath("/admin/sss");
  revalidatePath("/sss");
  revalidatePath("/");
}

export async function createFaqAction(
  _prev: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  await requireRole(CONTENT_ROLES);
  const parsed = schema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }
  const count = await prisma.fAQ.count();
  await prisma.fAQ.create({
    data: {
      question: parsed.data.question,
      answer: parsed.data.answer,
      category: parsed.data.category || null,
      order: count,
    },
  });
  revalidate();
  return { success: true };
}

export async function updateFaqAction(
  id: string,
  _prev: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  await requireRole(CONTENT_ROLES);
  const parsed = schema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }
  await prisma.fAQ.update({
    where: { id },
    data: {
      question: parsed.data.question,
      answer: parsed.data.answer,
      category: parsed.data.category || null,
    },
  });
  revalidate();
  return { success: true };
}

export async function deleteFaqAction(id: string) {
  await requireRole(["SUPERADMIN", "ADMIN", "EDITOR"]);
  await prisma.fAQ.delete({ where: { id } });
  revalidate();
}

export async function toggleFaqAction(id: string, isPublished: boolean) {
  await requireRole(CONTENT_ROLES);
  await prisma.fAQ.update({ where: { id }, data: { isPublished } });
  revalidate();
}

export async function moveFaqAction(id: string, direction: "up" | "down") {
  await requireRole(CONTENT_ROLES);
  const items = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return;
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= items.length) return;
  const current = items[index];
  const swapWith = items[swapIndex];
  await prisma.$transaction([
    prisma.fAQ.update({ where: { id: current.id }, data: { order: swapWith.order } }),
    prisma.fAQ.update({ where: { id: swapWith.id }, data: { order: current.order } }),
  ]);
  revalidate();
}
