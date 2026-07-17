import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getHeroSlideById } from "@/server/repositories/hero-slide.repository";
import { updateHeroSlideAction } from "@/server/actions/hero-slide.actions";
import { SlideForm } from "../slide-form";

export const metadata: Metadata = {
  title: "Slayt Düzenle",
  robots: { index: false, follow: false },
};

export default async function EditHeroSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await getHeroSlideById(id);

  if (!slide) notFound();

  const boundAction = updateHeroSlideAction.bind(null, id);

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
        Slayt Düzenle
      </h1>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <SlideForm
          action={boundAction}
          defaults={{
            title: slide.title,
            subtitle: slide.subtitle ?? "",
            description: slide.description ?? "",
            mediaType: slide.mediaType,
            videoUrl: slide.videoUrl ?? "",
            ctaLabel: slide.ctaLabel ?? "",
            ctaLink: slide.ctaLink ?? "",
            imageUrl: slide.imageUrl,
          }}
        />
      </div>
    </div>
  );
}
