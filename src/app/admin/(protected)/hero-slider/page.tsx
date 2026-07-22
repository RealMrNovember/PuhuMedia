import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllHeroSlides } from "@/server/repositories/hero-slide.repository";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { SlideRow } from "./slide-row";

export const metadata: Metadata = {
  title: "Hero Slider",
  robots: { index: false, follow: false },
};

export default async function HeroSliderPage() {
  const slides = await getAllHeroSlides();
  const activeCount = slides.filter((s) => s.isActive).length;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Hero Slider"
        description="Ana sayfa slider'ını yönetin — görsel veya YouTube video slaytları ekleyin, sırasını değiştirin."
        actions={
          <Button asChild className="rounded-full">
            <Link href="/admin/hero-slider/yeni">
              <Plus className="size-4" />
              Yeni Slayt
            </Link>
          </Button>
        }
      />

      {slides.length > 0 && activeCount === 0 ? (
        <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
          Aktif slayt yok. Ana sayfada varsayılan hero bölümü gösterilir.
        </p>
      ) : null}

      <div className="mt-8 space-y-3">
        {slides.length === 0 ? (
          <EmptyState
            title="Henüz slayt yok"
            description="Slayt eklemediğiniz sürece ana sayfada varsayılan hero bölümü gösterilir."
          />
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
