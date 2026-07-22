"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/admin/form-message";
import type { CaseStudyFormState } from "@/server/actions/case-study.actions";

export function CaseStudyForm({
  action,
  defaults,
}: {
  action: (s: CaseStudyFormState, fd: FormData) => Promise<CaseStudyFormState>;
  defaults?: Record<string, string | null | undefined>;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});
  useEffect(() => {
    if (state.success) {
      router.push(state.id ? `/admin/case-studies/${state.id}` : "/admin/case-studies");
      router.refresh();
    }
  }, [state, router]);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-5">
      <FormMessage error={state.error} success={state.success} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="title">Başlık *</Label><Input id="title" name="title" required defaultValue={defaults?.title ?? ""} /></div>
        <div className="space-y-1.5"><Label htmlFor="slug">Slug</Label><Input id="slug" name="slug" defaultValue={defaults?.slug ?? ""} /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="client">Müşteri *</Label><Input id="client" name="client" required defaultValue={defaults?.client ?? ""} /></div>
        <div className="space-y-1.5"><Label htmlFor="sector">Sektör *</Label><Input id="sector" name="sector" required defaultValue={defaults?.sector ?? ""} /></div>
      </div>
      {["problem","solution","strategy","process"].map((key) => (
        <div key={key} className="space-y-1.5">
          <Label htmlFor={key}>{key[0].toUpperCase() + key.slice(1)} *</Label>
          <Textarea id={key} name={key} rows={3} required defaultValue={defaults?.[key] ?? ""} />
        </div>
      ))}
      <div className="space-y-1.5"><Label htmlFor="resultsText">Sonuçlar (her satır bir madde)</Label><Textarea id="resultsText" name="resultsText" rows={4} defaultValue={defaults?.resultsText ?? ""} /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="status">Durum</Label>
          <select id="status" name="status" defaultValue={defaults?.status ?? "DRAFT"} className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm">
            <option value="DRAFT">Taslak</option>
            <option value="PUBLISHED">Yayında</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="coverImage">Kapak {defaults?.coverImage ? "(değiştirmek için seçin)" : "*"}</Label>
          <Input id="coverImage" name="coverImage" type="file" accept="image/*" required={!defaults?.coverImage} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="ctaText">CTA metni</Label><Input id="ctaText" name="ctaText" defaultValue={defaults?.ctaText ?? ""} /></div>
        <div className="space-y-1.5"><Label htmlFor="seoTitle">SEO Başlık</Label><Input id="seoTitle" name="seoTitle" defaultValue={defaults?.seoTitle ?? ""} /></div>
      </div>
      <div className="space-y-1.5"><Label htmlFor="seoDescription">SEO Açıklama</Label><Input id="seoDescription" name="seoDescription" defaultValue={defaults?.seoDescription ?? ""} /></div>
      <Button type="submit" disabled={pending} className="rounded-full">{pending ? <Loader2 className="size-4 animate-spin" /> : null} Kaydet</Button>
    </form>
  );
}
