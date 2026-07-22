"use client";

import { useTransition } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import {
  deleteTestimonialAction,
  moveTestimonialAction,
  toggleTestimonialAction,
  updateTestimonialAction,
} from "@/server/actions/testimonial.actions";
import { TestimonialForm } from "./testimonial-form";
import { StatusBadge } from "@/components/admin/status-badge";

export function TestimonialRow({
  id,
  name,
  role,
  company,
  quote,
  rating,
  photo,
  isPublished,
  isFirst,
  isLast,
}: {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  photo: string | null;
  isPublished: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <StatusBadge variant={isPublished ? "published" : "draft"} />
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={pending || isFirst}
            onClick={() => startTransition(() => moveTestimonialAction(id, "up"))}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <ArrowUp className="size-4" />
          </button>
          <button
            type="button"
            disabled={pending || isLast}
            onClick={() => startTransition(() => moveTestimonialAction(id, "down"))}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <ArrowDown className="size-4" />
          </button>
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <input
              type="checkbox"
              defaultChecked={isPublished}
              disabled={pending}
              onChange={(e) =>
                startTransition(() => toggleTestimonialAction(id, e.target.checked))
              }
            />
            Yayında
          </label>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (window.confirm("Bu yorumu silmek istiyor musunuz?")) {
                startTransition(() => deleteTestimonialAction(id));
              }
            }}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
      <TestimonialForm
        action={updateTestimonialAction.bind(null, id)}
        defaults={{ name, role, company, quote, rating, photo }}
        submitLabel="Güncelle"
      />
    </div>
  );
}
