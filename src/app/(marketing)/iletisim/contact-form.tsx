"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  submitContactAction,
  type ContactFormState,
} from "@/server/actions/contact.actions";

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactAction,
    initialState
  );

  if (state.success) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="size-10 text-primary" />
        <h3 className="mt-4 font-heading text-lg font-medium text-foreground">
          Mesajınız İletildi
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          En kısa sürede size dönüş yapacağız. Teşekkür ederiz.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
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
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="subject" className="text-sm font-medium text-foreground">
            Konu
          </label>
          <input
            id="subject"
            name="subject"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Mesajınız *
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {state.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}

      <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        Mesaj Gönder
      </Button>
    </form>
  );
}
