import type { Metadata } from "next";
import { getSiteSettings } from "@/server/repositories/site-setting.repository";
import { PageHeader } from "@/components/admin/page-header";
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
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Site Ayarları"
        description="İletişim bilgileri, sosyal medya, menü stili ve analitik ayarlarını buradan yönetebilirsiniz."
      />

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <SettingsForm values={values} />
      </div>
    </div>
  );
}
