import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSiteSettings } from "@/server/repositories/site-setting.repository";
import { SettingsForm } from "./settings-form";

export const metadata: Metadata = {
  title: "Site Ayarları",
  robots: { index: false, follow: false },
};

const KEYS = [
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
];

export default async function AdminSettingsPage() {
  const raw = await getSiteSettings(KEYS);
  const values = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, String(value ?? "")])
  );

  return (
    <div className="container-brand max-w-3xl py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Panele Dön
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-medium text-foreground">
        Site Ayarları
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        İletişim bilgileri, sosyal medya, menü stili ve analitik ayarlarını
        buradan yönetebilirsiniz.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <SettingsForm values={values} />
      </div>
    </div>
  );
}
