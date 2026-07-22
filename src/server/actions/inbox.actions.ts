"use server";

import { revalidatePath } from "next/cache";
import { ADMIN_ROLES, CONTENT_ROLES } from "@/lib/admin/permissions";
import { requireRole } from "@/lib/admin/require-session";
import {
  deleteContact,
  markContactRead,
} from "@/server/repositories/contact.repository";
import {
  deleteLead,
  updateLeadStatus,
} from "@/server/repositories/lead.repository";
import type { LeadStatus } from "@/generated/prisma/enums";

function revalidateInbox() {
  revalidatePath("/admin/teklifler");
  revalidatePath("/admin/iletisim-mesajlari");
  revalidatePath("/admin");
}

export async function markContactReadAction(id: string, isRead = true) {
  await requireRole(CONTENT_ROLES);
  await markContactRead(id, isRead);
  revalidateInbox();
}

export async function updateLeadStatusAction(id: string, status: LeadStatus) {
  await requireRole(CONTENT_ROLES);
  await updateLeadStatus(id, status);
  revalidateInbox();
}

export async function deleteContactAction(id: string) {
  await requireRole(ADMIN_ROLES);
  await deleteContact(id);
  revalidateInbox();
}

export async function deleteLeadAction(id: string) {
  await requireRole(ADMIN_ROLES);
  await deleteLead(id);
  revalidateInbox();
}
