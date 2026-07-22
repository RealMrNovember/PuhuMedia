"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/admin/form-message";
import type { TestimonialFormState } from "@/server/actions/testimonial.actions";

export function TestimonialForm({
  action,
  defaults,
  submitLabel = "Kaydet",
}: {
  action: (s: TestimonialFormState, fd: FormData) => Promise<TestimonialFormState>;
  defaults?: { name?: string; role?: string; company?: string; quote?: string; rating?: number; photo?: string | null };
  submitLabel?: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);
  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-4">
      <FormMessage error={state.error} success={state.success} />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5"><Label htmlFor="name">Ad *</Label><Input id="name" name="name" required defaultValue={defaults?.name} /></div>
        <div className="space-y-1.5"><Label htmlFor="role">Ünvan *</Label><Input id="role" name="role" required defaultValue={defaults?.role} /></div>
        <div className="space-y-1.5"><Label htmlFor="company">Firma *</Label><Input id="company" name="company" required defaultValue={defaults?.company} /></div>
      </div>
      <div className="space-y-1.5"><Label htmlFor="quote">Yorum *</Label><Textarea id="quote" name="quote" rows={3} required defaultValue={defaults?.quote} /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="rating">Puan</Label><Input id="rating" name="rating" type="number" min={1} max={5} defaultValue={defaults?.rating ?? 5} /></div>
        <div className="space-y-1.5"><Label htmlFor="photo">Fotoğraf</Label><Input id="photo" name="photo" type="file" accept=".jpg,.jpeg,.png,.webp" /></div>
      </div>
      <Button type="submit" disabled={pending} className="rounded-full">{pending ? <Loader2 className="size-4 animate-spin" /> : null} {submitLabel}</Button>
    </form>
  );
}
