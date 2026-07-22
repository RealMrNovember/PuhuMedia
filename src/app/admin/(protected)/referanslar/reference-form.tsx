"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/admin/form-message";
import type { ReferenceFormState } from "@/server/actions/reference.actions";

export function ReferenceForm({
  action,
  defaults,
}: {
  action: (s: ReferenceFormState, fd: FormData) => Promise<ReferenceFormState>;
  defaults?: {
    name?: string; slug?: string; sector?: string; description?: string;
    results?: string; servicesUsed?: string; logo?: string;
    isFeatured?: boolean; isPublished?: boolean;
  };
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});
  useEffect(() => {
    if (state.success) {
      router.push(state.id ? `/admin/referanslar/${state.id}` : "/admin/referanslar");
      router.refresh();
    }
  }, [state, router]);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-5">
      <FormMessage error={state.error} success={state.success} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="name">Ad *</Label><Input id="name" name="name" required defaultValue={defaults?.name} /></div>
        <div className="space-y-1.5"><Label htmlFor="slug">Slug</Label><Input id="slug" name="slug" defaultValue={defaults?.slug} /></div>
      </div>
      <div className="space-y-1.5"><Label htmlFor="sector">Sektör *</Label><Input id="sector" name="sector" required defaultValue={defaults?.sector} /></div>
      <div className="space-y-1.5"><Label htmlFor="description">Açıklama *</Label><Textarea id="description" name="description" rows={4} required defaultValue={defaults?.description} /></div>
      <div className="space-y-1.5"><Label htmlFor="results">Sonuçlar</Label><Textarea id="results" name="results" rows={3} defaultValue={defaults?.results} /></div>
      <div className="space-y-1.5"><Label htmlFor="servicesUsed">Kullanılan hizmetler (virgülle)</Label><Input id="servicesUsed" name="servicesUsed" defaultValue={defaults?.servicesUsed} /></div>
      <div className="space-y-1.5">
        <Label htmlFor="logo">Logo {defaults?.logo ? "(değiştirmek için seçin)" : "*"}</Label>
        <Input id="logo" name="logo" type="file" accept="image/*" required={!defaults?.logo} />
        {defaults?.logo ? <p className="text-xs text-muted-foreground">{defaults.logo}</p> : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="isFeatured">Öne çıkan</Label>
          <select
            id="isFeatured"
            name="isFeatured"
            defaultValue={defaults?.isFeatured ? "true" : "false"}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm"
          >
            <option value="false">Hayır</option>
            <option value="true">Evet</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="isPublished">Yayın durumu</Label>
          <select
            id="isPublished"
            name="isPublished"
            defaultValue={defaults?.isPublished === false ? "false" : "true"}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm"
          >
            <option value="true">Yayında</option>
            <option value="false">Taslak</option>
          </select>
        </div>
      </div>
      <Button type="submit" disabled={pending} className="rounded-full">{pending ? <Loader2 className="size-4 animate-spin" /> : null} Kaydet</Button>
    </form>
  );
}
