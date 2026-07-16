"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { setSiteSetting } from "@/server/repositories/site-setting.repository";

const SETTINGS_KEYS = [
  "contact_phone",
  "contact_whatsapp",
  "contact_email",
  "contact_address",
  "working_hours",
  "social_instagram",
  "social_linkedin",
  "social_youtube",
  "instagram_handle",
  "google_maps_embed_url",
  "nav_style",
  "theme_primary_color",
  "theme_accent_color",
  "ga_id",
  "gtm_id",
] as const;

export type SettingsState = { success?: boolean; error?: string };

export async function updateSettingsAction(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const session = await auth();
  if (!session?.user || !["SUPERADMIN", "ADMIN"].includes(session.user.role)) {
    return { error: "Bu işlem için yetkiniz yok." };
  }

  for (const key of SETTINGS_KEYS) {
    const value = formData.get(key);
    if (value !== null) {
      await setSiteSetting(key, String(value));
    }
  }

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: "UPDATE",
      entityType: "SiteSetting",
      metadata: { keys: SETTINGS_KEYS },
    },
  });

  revalidatePath("/", "layout");

  return { success: true };
}
