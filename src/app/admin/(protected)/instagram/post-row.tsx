"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import {
  deleteInstagramPostAction,
  toggleInstagramPostAction,
} from "@/server/actions/instagram.actions";

export function PostRow({
  id,
  url,
  caption,
  isActive,
}: {
  id: string;
  url: string;
  caption: string | null;
  isActive: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
      <div className="min-w-0">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="block truncate text-sm font-medium text-foreground hover:underline"
        >
          {url}
        </a>
        {caption ? (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{caption}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <input
            type="checkbox"
            defaultChecked={isActive}
            disabled={isPending}
            onChange={(e) =>
              startTransition(() => {
                toggleInstagramPostAction(id, e.target.checked);
              })
            }
          />
          Aktif
        </label>
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => deleteInstagramPostAction(id))}
          className="text-muted-foreground transition-colors hover:text-destructive"
          aria-label="Sil"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
