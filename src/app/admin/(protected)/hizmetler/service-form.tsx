"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/admin/form-message";
import type { ServicePageFormState } from "@/server/actions/service-page.actions";
import type { ServicePageContent } from "@/lib/services-content";

export function ServicePageForm({
  action,
  defaults,
}: {
  action: (s: ServicePageFormState, fd: FormData) => Promise<ServicePageFormState>;
  defaults: {
    label: string; shortDescription: string; category: string;
    seoTitle: string; seoDescription: string; isPublished: boolean;
    content: ServicePageContent;
  };
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);

  const features = defaults.content.features.length
    ? defaults.content.features
    : [{ title: "", description: "" }, { title: "", description: "" }];
  const faqs = defaults.content.faqs.length
    ? defaults.content.faqs
    : [{ question: "", answer: "" }];

  return (
    <form action={formAction} className="space-y-5">
      <FormMessage error={state.error} success={state.success} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="label">Başlık *</Label><Input id="label" name="label" required defaultValue={defaults.label} /></div>
        <div className="space-y-1.5"><Label htmlFor="category">Kategori *</Label><Input id="category" name="category" required defaultValue={defaults.category} /></div>
      </div>
      <div className="space-y-1.5"><Label htmlFor="shortDescription">Kısa açıklama *</Label><Input id="shortDescription" name="shortDescription" required defaultValue={defaults.shortDescription} /></div>
      <div className="space-y-1.5"><Label htmlFor="heroTagline">Hero etiket *</Label><Input id="heroTagline" name="heroTagline" required defaultValue={defaults.content.heroTagline} /></div>
      <div className="space-y-1.5"><Label htmlFor="heroDescription">Hero açıklama *</Label><Textarea id="heroDescription" name="heroDescription" rows={3} required defaultValue={defaults.content.heroDescription} /></div>
      <div className="space-y-1.5"><Label htmlFor="highlights">Öne çıkanlar (satır satır)</Label><Textarea id="highlights" name="highlights" rows={4} defaultValue={defaults.content.highlights.join("\n")} /></div>
      <div className="space-y-1.5"><Label htmlFor="overview">Genel bakış (paragraflar boş satırla ayrılır)</Label><Textarea id="overview" name="overview" rows={6} defaultValue={defaults.content.overview.join("\n\n")} /></div>
      <div className="space-y-3">
        <p className="text-sm font-medium">Özellikler</p>
        {features.map((feature, index) => (
          <div key={index} className="grid gap-3 sm:grid-cols-2">
            <Input name="featureTitle" placeholder="Başlık" defaultValue={feature.title} />
            <Input name="featureDescription" placeholder="Açıklama" defaultValue={feature.description} />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <p className="text-sm font-medium">SSS</p>
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-2 rounded-xl border border-border p-3">
            <Input name="faqQuestion" placeholder="Soru" defaultValue={faq.question} />
            <Textarea name="faqAnswer" placeholder="Cevap" rows={2} defaultValue={faq.answer} />
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="seoTitle">SEO Başlık</Label><Input id="seoTitle" name="seoTitle" defaultValue={defaults.seoTitle} /></div>
        <div className="space-y-1.5"><Label htmlFor="seoDescription">SEO Açıklama</Label><Input id="seoDescription" name="seoDescription" defaultValue={defaults.seoDescription} /></div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="isPublished">Yayın durumu</Label>
        <select
          id="isPublished"
          name="isPublished"
          defaultValue={defaults.isPublished ? "true" : "false"}
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm"
        >
          <option value="true">Yayında</option>
          <option value="false">Taslak</option>
        </select>
      </div>
      <Button type="submit" disabled={pending} className="rounded-full">{pending ? <Loader2 className="size-4 animate-spin" /> : null} Kaydet</Button>
    </form>
  );
}
