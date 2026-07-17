import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { getAllHeroSlides } from "@/server/repositories/hero-slide.repository";
import { Button } from "@/components/ui/button";
import { SlideRow } from "./slide-row";

export const metadata: Metadata = {
  title: "Hero Slider",
  robots: { index: false, follow: false },
};

export default async function HeroSliderPage() {
  const slides = await getAllHeroSlides();

  return (
    <div className="container-brand max-w-3xl py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Panele Dön
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-foreground">
            Hero Slider
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ana sayfadaki slider&apos;ı yönetin — görsel veya YouTube video
            slaytları ekleyin, sırasını değiştirin.
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/admin/hero-slider/yeni">
            <Plus className="size-4" />
            Yeni Slayt
          </Link>
        </Button>
      </div>

      <div className="mt-8 space-y-3">
        {slides.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Henüz slayt eklenmedi. Slayt eklemediğiniz sürece ana sayfada
            varsayılan hero bölümü gösterilir.
          </p>
        ) : (
          slides.map((slide, index) => (
            <SlideRow
              key={slide.id}
              id={slide.id}
              title={slide.title}
              mediaType={slide.mediaType}
              isActive={slide.isActive}
              isFirst={index === 0}
              isLast={index === slides.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
