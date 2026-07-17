"use client";

import { useTransition } from "react";
import Link from "next/link";
import { ArrowUp, ArrowDown, Pencil, Trash2, Image as ImageIcon, Video } from "lucide-react";
import {
  deleteHeroSlideAction,
  moveHeroSlideAction,
  toggleHeroSlideAction,
} from "@/server/actions/hero-slide.actions";

export function SlideRow({
  id,
  title,
  mediaType,
  isActive,
  isFirst,
  isLast,
}: {
  id: string;
  title: string;
  mediaType: "IMAGE" | "VIDEO";
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
      <div className="flex items-center gap-3 min-w-0">
        {mediaType === "VIDEO" ? (
          <Video className="size-4 shrink-0 text-primary" />
        ) : (
          <ImageIcon className="size-4 shrink-0 text-primary" />
        )}
        <span className="truncate text-sm font-medium text-foreground">{title}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          disabled={isPending || isFirst}
          onClick={() => startTransition(() => moveHeroSlideAction(id, "up"))}
          className="text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          aria-label="Yukarı taşı"
        >
          <ArrowUp className="size-4" />
        </button>
        <button
          type="button"
          disabled={isPending || isLast}
          onClick={() => startTransition(() => moveHeroSlideAction(id, "down"))}
          className="text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          aria-label="Aşağı taşı"
        >
          <ArrowDown className="size-4" />
        </button>
        <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <input
            type="checkbox"
            defaultChecked={isActive}
            disabled={isPending}
            onChange={(e) =>
              startTransition(() => toggleHeroSlideAction(id, e.target.checked))
            }
          />
          Aktif
        </label>
        <Link
          href={`/admin/hero-slider/${id}`}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Düzenle"
        >
          <Pencil className="size-4" />
        </Link>
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => deleteHeroSlideAction(id))}
          className="text-muted-foreground transition-colors hover:text-destructive"
          aria-label="Sil"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
