"use client";

import { useActionState, useRef, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addInstagramPostAction,
  type InstagramFormState,
} from "@/server/actions/instagram.actions";

const initialState: InstagramFormState = {};

export function AddPostForm() {
  const [state, formAction, isPending] = useActionState(
    addInstagramPostAction,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isPending && !state.error) {
      formRef.current?.reset();
    }
  }, [isPending, state.error]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-1.5">
        <label htmlFor="url" className="text-sm font-medium text-foreground">
          Instagram Gönderi Linki
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          placeholder="https://www.instagram.com/p/..."
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="flex-1 space-y-1.5">
        <label htmlFor="caption" className="text-sm font-medium text-foreground">
          Not (opsiyonel)
        </label>
        <input
          id="caption"
          name="caption"
          type="text"
          placeholder="Kısa açıklama"
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <Button type="submit" disabled={isPending} className="rounded-full">
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
        Ekle
      </Button>
      {state.error ? (
        <p className="text-sm text-destructive sm:basis-full">{state.error}</p>
      ) : null}
    </form>
  );
}
