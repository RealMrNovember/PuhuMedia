"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/admin/form-message";
import type { BlogFormState } from "@/server/actions/blog.actions";

type Defaults = {
  title?: string; slug?: string; excerpt?: string; contentHtml?: string;
  status?: string; seoTitle?: string; seoDescription?: string; coverImage?: string | null;
};

export function BlogForm({
  action,
  defaults,
}: {
  action: (state: BlogFormState, formData: FormData) => Promise<BlogFormState>;
  defaults?: Defaults;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});

  useEffect(() => {
    if (state.success && state.id) {
      router.push(`/admin/blog/${state.id}`);
      router.refresh();
    } else if (state.success) {
      router.push("/admin/blog");
      router.refresh();
    }
  }, [state, router]);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-5">
      <FormMessage error={state.error} success={state.success} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="title">Başlık *</Label><Input id="title" name="title" required defaultValue={defaults?.title} /></div>
        <div className="space-y-1.5"><Label htmlFor="slug">Slug</Label><Input id="slug" name="slug" defaultValue={defaults?.slug} placeholder="otomatik" /></div>
      </div>
      <div className="space-y-1.5"><Label htmlFor="excerpt">Özet *</Label><Textarea id="excerpt" name="excerpt" rows={2} required defaultValue={defaults?.excerpt} /></div>
      <div className="space-y-1.5"><Label htmlFor="contentHtml">İçerik (HTML) *</Label><Textarea id="contentHtml" name="contentHtml" rows={12} required defaultValue={defaults?.contentHtml} /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="status">Durum</Label>
          <select id="status" name="status" defaultValue={defaults?.status ?? "DRAFT"} className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm">
            <option value="DRAFT">Taslak</option>
            <option value="PUBLISHED">Yayında</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="coverImage">Kapak görseli {defaults?.coverImage ? "(değiştirmek için seçin)" : ""}</Label>
          <Input id="coverImage" name="coverImage" type="file" accept="image/*" />
          {defaults?.coverImage ? <p className="text-xs text-muted-foreground">{defaults.coverImage}</p> : null}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="seoTitle">SEO Başlık</Label><Input id="seoTitle" name="seoTitle" defaultValue={defaults?.seoTitle} /></div>
        <div className="space-y-1.5"><Label htmlFor="seoDescription">SEO Açıklama</Label><Input id="seoDescription" name="seoDescription" defaultValue={defaults?.seoDescription} /></div>
      </div>
      <Button type="submit" disabled={pending} className="rounded-full">
        {pending ? <Loader2 className="size-4 animate-spin" /> : null}
        Kaydet
      </Button>
    </form>
  );
}
