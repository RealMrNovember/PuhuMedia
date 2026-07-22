"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/admin/form-message";
import { uploadMediaAction, type MediaFormState } from "@/server/actions/media.actions";

export function MediaUploadForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(uploadMediaAction, {} as MediaFormState);
  useEffect(() => { if (state.success) router.refresh(); }, [state.success, router]);
  return (
    <form action={action} encType="multipart/form-data" className="space-y-4">
      <FormMessage error={state.error} success={state.success} successMessage="Dosya yüklendi." />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="file">Dosya *</Label><Input id="file" name="file" type="file" required accept="image/*,application/pdf" /></div>
        <div className="space-y-1.5"><Label htmlFor="alt">Alt metin</Label><Input id="alt" name="alt" /></div>
      </div>
      <Button type="submit" disabled={pending} className="rounded-full">{pending ? <Loader2 className="size-4 animate-spin" /> : null} Yükle</Button>
    </form>
  );
}
