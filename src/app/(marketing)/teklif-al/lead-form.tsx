"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-config";
import { submitLeadAction, type LeadFormState } from "@/server/actions/lead.actions";

const budgetRanges = [
  "Belirtmek istemiyorum",
  "10.000 - 25.000 TL",
  "25.000 - 50.000 TL",
  "50.000 - 100.000 TL",
  "100.000 TL üzeri",
];

const initialState: LeadFormState = {};

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(
    submitLeadAction,
    initialState
  );

  if (state.success) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center">
        <CheckCircle2 className="size-12 text-primary" />
        <h3 className="mt-5 font-heading text-xl font-medium text-foreground">
          Teklif Talebiniz Alındı
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Ekibimiz talebinizi inceleyip en kısa sürede sizinle iletişime
          geçecek. İlginiz için teşekkür ederiz.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-5">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="company" className="text-sm font-medium text-foreground">
            Firma
          </label>
          <input
            id="company"
            name="company"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Ad Soyad *
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            minLength={2}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Telefon *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            minLength={6}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            E-posta *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="service" className="text-sm font-medium text-foreground">
            İlgilendiğiniz Hizmet *
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>
              Seçiniz
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.label}>
                {service.label}
              </option>
            ))}
            <option value="Diğer">Diğer</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="budget" className="text-sm font-medium text-foreground">
            Tahmini Bütçe
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>
              Seçiniz
            </option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Projeniz Hakkında
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Projeniz, hedefleriniz ve beklentileriniz hakkında bize bilgi verin."
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="file" className="text-sm font-medium text-foreground">
          Dosya Ekle (opsiyonel)
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm"
        />
        <p className="text-xs text-muted-foreground">
          PDF, JPG, PNG veya WEBP — maksimum 10MB.
        </p>
      </div>

      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}

      <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        Teklif Talebi Gönder
      </Button>
    </form>
  );
}
