"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/admin/form-message";
import {
  createFaqAction,
  updateFaqAction,
  type FaqFormState,
} from "@/server/actions/faq.actions";

function FaqFields({ defaults }: { defaults?: { question?: string; answer?: string; category?: string } }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5"><Label htmlFor="question">Soru *</Label><Input id="question" name="question" required defaultValue={defaults?.question} /></div>
      <div className="space-y-1.5"><Label htmlFor="answer">Cevap *</Label><Textarea id="answer" name="answer" rows={4} required defaultValue={defaults?.answer} /></div>
      <div className="space-y-1.5"><Label htmlFor="category">Kategori</Label><Input id="category" name="category" defaultValue={defaults?.category} /></div>
    </div>
  );
}

export function FaqCreateForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(createFaqAction, {} as FaqFormState);
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);
  return (
    <form action={action} className="space-y-4">
      <FormMessage error={state.error} success={state.success} successMessage="Soru eklendi." />
      <FaqFields />
      <Button type="submit" disabled={pending} className="rounded-full">{pending ? <Loader2 className="size-4 animate-spin" /> : null} Ekle</Button>
    </form>
  );
}

export function FaqEditForm({ id, defaults }: { id: string; defaults: { question: string; answer: string; category: string } }) {
  const router = useRouter();
  const bound = updateFaqAction.bind(null, id);
  const [state, action, pending] = useActionState(bound, {} as FaqFormState);
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);
  return (
    <form action={action} className="space-y-4">
      <FormMessage error={state.error} success={state.success} />
      <FaqFields defaults={defaults} />
      <Button type="submit" disabled={pending} variant="outline" className="rounded-full">{pending ? <Loader2 className="size-4 animate-spin" /> : null} Güncelle</Button>
    </form>
  );
}
