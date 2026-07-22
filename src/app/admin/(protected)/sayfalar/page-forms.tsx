"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/admin/form-message";
import type { CmsPageFormState } from "@/server/actions/cms-page.actions";

export function AboutPageForm({
  action,
  defaults,
}: {
  action: (s: CmsPageFormState, fd: FormData) => Promise<CmsPageFormState>;
  defaults: {
    title: string; seoTitle: string; seoDescription: string;
    heroTitle: string; heroBody: string; mission: string; vision: string;
    values: { title: string; description: string }[];
  };
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);
  const values = defaults.values.length ? defaults.values : [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ];

  return (
    <form action={formAction} className="space-y-5">
      <FormMessage error={state.error} success={state.success} />
      <div className="space-y-1.5"><Label htmlFor="title">Sayfa başlığı</Label><Input id="title" name="title" defaultValue={defaults.title} /></div>
      <div className="space-y-1.5"><Label htmlFor="heroTitle">Hero başlık *</Label><Input id="heroTitle" name="heroTitle" required defaultValue={defaults.heroTitle} /></div>
      <div className="space-y-1.5"><Label htmlFor="heroBody">Hero metin *</Label><Textarea id="heroBody" name="heroBody" rows={4} required defaultValue={defaults.heroBody} /></div>
      <div className="space-y-1.5"><Label htmlFor="mission">Misyon</Label><Textarea id="mission" name="mission" rows={3} defaultValue={defaults.mission} /></div>
      <div className="space-y-1.5"><Label htmlFor="vision">Vizyon</Label><Textarea id="vision" name="vision" rows={3} defaultValue={defaults.vision} /></div>
      <div className="space-y-3">
        <p className="text-sm font-medium">Değerler</p>
        {values.map((value, index) => (
          <div key={index} className="grid gap-3 sm:grid-cols-2">
            <Input name="valueTitle" placeholder="Başlık" defaultValue={value.title} />
            <Input name="valueDescription" placeholder="Açıklama" defaultValue={value.description} />
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="seoTitle">SEO Başlık</Label><Input id="seoTitle" name="seoTitle" defaultValue={defaults.seoTitle} /></div>
        <div className="space-y-1.5"><Label htmlFor="seoDescription">SEO Açıklama</Label><Input id="seoDescription" name="seoDescription" defaultValue={defaults.seoDescription} /></div>
      </div>
      <Button type="submit" disabled={pending} className="rounded-full">{pending ? <Loader2 className="size-4 animate-spin" /> : null} Kaydet</Button>
    </form>
  );
}

export function LegalPageForm({
  action,
  defaults,
}: {
  action: (s: CmsPageFormState, fd: FormData) => Promise<CmsPageFormState>;
  defaults: { title: string; seoTitle: string; seoDescription: string; html: string };
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);
  return (
    <form action={formAction} className="space-y-5">
      <FormMessage error={state.error} success={state.success} />
      <div className="space-y-1.5"><Label htmlFor="title">Başlık *</Label><Input id="title" name="title" required defaultValue={defaults.title} /></div>
      <div className="space-y-1.5"><Label htmlFor="html">İçerik (HTML) *</Label><Textarea id="html" name="html" rows={16} required defaultValue={defaults.html} /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="seoTitle">SEO Başlık</Label><Input id="seoTitle" name="seoTitle" defaultValue={defaults.seoTitle} /></div>
        <div className="space-y-1.5"><Label htmlFor="seoDescription">SEO Açıklama</Label><Input id="seoDescription" name="seoDescription" defaultValue={defaults.seoDescription} /></div>
      </div>
      <Button type="submit" disabled={pending} className="rounded-full">{pending ? <Loader2 className="size-4 animate-spin" /> : null} Kaydet</Button>
    </form>
  );
}
