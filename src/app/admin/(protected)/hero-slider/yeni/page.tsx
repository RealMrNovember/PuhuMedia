import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createHeroSlideAction } from "@/server/actions/hero-slide.actions";
import { SlideForm } from "../slide-form";

export const metadata: Metadata = {
  title: "Yeni Slayt",
  robots: { index: false, follow: false },
};

export default function NewHeroSlidePage() {
  return (
    <div className="container-brand max-w-2xl py-10">
      <Link
        href="/admin/hero-slider"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Hero Slider
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-medium text-foreground">
        Yeni Slayt
      </h1>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <SlideForm action={createHeroSlideAction} />
      </div>
    </div>
  );
}
