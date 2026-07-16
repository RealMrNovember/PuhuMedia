import { cache } from "react";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site-config";

export async function getSiteSetting<T = unknown>(
  key: string,
  fallback: T
): Promise<T> {
  const setting = await prisma.siteSetting.findUnique({ where: { key } });
  if (!setting) return fallback;
  return setting.value as T;
}

export async function getSiteSettings(keys: string[]) {
  const settings = await prisma.siteSetting.findMany({
    where: { key: { in: keys } },
  });
  return Object.fromEntries(settings.map((s) => [s.key, s.value])) as Record<
    string,
    unknown
  >;
}

export async function setSiteSetting(key: string, value: unknown) {
  return prisma.siteSetting.upsert({
    where: { key },
    update: { value: value as never },
    create: { key, value: value as never },
  });
}

const CONTACT_KEYS = [
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
];

export const getContactInfo = cache(async () => {
  const settings = await getSiteSettings(CONTACT_KEYS);
  const str = (key: string, fallback: string) =>
    (settings[key] as string) || fallback;

  const phone = str("contact_phone", siteConfig.contact.phone);
  const whatsapp = str("contact_whatsapp", siteConfig.contact.whatsapp);

  return {
    phone,
    phoneRaw: phone.replace(/[^\d+]/g, ""),
    whatsapp: whatsapp.replace(/[^\d+]/g, ""),
    email: str("contact_email", siteConfig.contact.email),
    address: str("contact_address", siteConfig.contact.address),
    workingHours: str("working_hours", siteConfig.contact.workingHours),
    social: {
      instagram: str("social_instagram", siteConfig.social.instagram),
      linkedin: str("social_linkedin", siteConfig.social.linkedin),
      youtube: str("social_youtube", siteConfig.social.youtube),
    },
    instagramHandle: str("instagram_handle", ""),
    googleMapsEmbedUrl: str("google_maps_embed_url", ""),
  };
});

export type ContactInfo = Awaited<ReturnType<typeof getContactInfo>>;
