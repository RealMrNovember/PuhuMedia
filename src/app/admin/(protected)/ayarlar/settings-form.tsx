"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  updateSettingsAction,
  type SettingsState,
} from "@/server/actions/settings.actions";

type Values = Record<string, string>;

function Field({
  name,
  label,
  defaultValue,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

const initialState: SettingsState = {};

export function SettingsForm({ values }: { values: Values }) {
  const [state, formAction, isPending] = useActionState(
    updateSettingsAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-10">
      <section>
        <h2 className="font-heading text-lg font-medium text-foreground">
          İletişim Bilgileri
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="contact_phone" label="Telefon" defaultValue={values.contact_phone} placeholder="+90 542 490 65 28" />
          <Field name="contact_whatsapp" label="WhatsApp (uluslararası format)" defaultValue={values.contact_whatsapp} placeholder="+905424906528" />
          <Field name="contact_email" label="E-posta" defaultValue={values.contact_email} type="email" />
          <Field name="contact_address" label="Adres" defaultValue={values.contact_address} />
          <Field name="working_hours" label="Çalışma Saatleri" defaultValue={values.working_hours} />
          <Field name="google_maps_embed_url" label="Google Maps Embed URL" defaultValue={values.google_maps_embed_url} placeholder="https://www.google.com/maps/embed?..." />
        </div>
      </section>

      <section>
        <h2 className="font-heading text-lg font-medium text-foreground">
          Sosyal Medya
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="social_instagram" label="Instagram URL" defaultValue={values.social_instagram} />
          <Field name="instagram_handle" label="Instagram Kullanıcı Adı (@olmadan)" defaultValue={values.instagram_handle} placeholder="puhumedia" />
          <Field name="social_linkedin" label="LinkedIn URL" defaultValue={values.social_linkedin} />
          <Field name="social_youtube" label="YouTube URL" defaultValue={values.social_youtube} />
        </div>
      </section>

      <section>
        <h2 className="font-heading text-lg font-medium text-foreground">
          Görünüm
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="nav_style" className="text-sm font-medium text-foreground">
              Mobil / Site Menü Stili
            </label>
            <select
              id="nav_style"
              name="nav_style"
              defaultValue={values.nav_style ?? "bottombar"}
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="topbar">Üst Menü (klasik)</option>
              <option value="bottombar">Alt Menü Çubuğu (mobil, önerilen)</option>
              <option value="sidebar">Yan Menü (masaüstü)</option>
            </select>
          </div>
          <Field name="theme_primary_color" label="Ana Renk (hex)" defaultValue={values.theme_primary_color} placeholder="#C9A227" />
        </div>
      </section>

      <section>
        <h2 className="font-heading text-lg font-medium text-foreground">
          Analitik
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="ga_id" label="Google Analytics ID" defaultValue={values.ga_id} placeholder="G-XXXXXXX" />
          <Field name="gtm_id" label="Google Tag Manager ID" defaultValue={values.gtm_id} placeholder="GTM-XXXXXXX" />
        </div>
      </section>

      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      {state.success ? (
        <p className="text-sm text-primary">Ayarlar kaydedildi.</p>
      ) : null}

      <Button type="submit" className="rounded-full px-6" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        Kaydet
      </Button>
    </form>
  );
}
