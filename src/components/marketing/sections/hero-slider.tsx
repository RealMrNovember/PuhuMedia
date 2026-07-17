"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getYoutubeEmbedUrl } from "@/lib/video-embed";

export type HeroSlideData = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  mediaType: "IMAGE" | "VIDEO";
  imageUrl: string | null;
  videoUrl: string | null;
  ctaLabel: string | null;
  ctaLink: string | null;
};

const AUTOPLAY_MS = 7000;

export function HeroSlider({ slides }: { slides: HeroSlideData[] }) {
  const [index, setIndex] = React.useState(0);
  const count = slides.length;

  const goTo = React.useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  React.useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [index, count, goTo]);

  const slide = slides[index];
  const embedUrl =
    slide.mediaType === "VIDEO" && slide.videoUrl
      ? getYoutubeEmbedUrl(slide.videoUrl, { autoplay: true, muted: true, loop: true, controls: false })
      : null;

  return (
    <section className="relative min-h-[640px] overflow-hidden bg-foreground text-background md:min-h-[720px]">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {embedUrl ? (
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src={embedUrl}
                title={slide.title}
                allow="autoplay; encrypted-media"
                className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          ) : slide.imageUrl ? (
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30" />
        </motion.div>
      </AnimatePresence>

      <div className="container-brand relative flex min-h-[640px] flex-col items-center justify-center py-24 text-center md:min-h-[720px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-w-3xl flex-col items-center"
          >
            {slide.subtitle ? (
              <span className="rounded-full border border-background/15 bg-background/5 px-4 py-1.5 text-xs font-medium text-background/80">
                {slide.subtitle}
              </span>
            ) : null}
            <h1 className="mt-6 text-balance font-heading text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl md:text-6xl">
              {slide.title}
            </h1>
            {slide.description ? (
              <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-background/75">
                {slide.description}
              </p>
            ) : null}
            {slide.ctaLabel && slide.ctaLink ? (
              <Button
                asChild
                size="lg"
                className="mt-9 rounded-full px-7 text-base shadow-lg shadow-primary/20"
              >
                <Link href={slide.ctaLink}>
                  {slide.ctaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {count > 1 ? (
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4">
            <button
              type="button"
              aria-label="Önceki slayt"
              onClick={() => goTo(index - 1)}
              className="flex size-9 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:bg-background/10"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`${i + 1}. slayt`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-primary" : "w-1.5 bg-background/30"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Sonraki slayt"
              onClick={() => goTo(index + 1)}
              className="flex size-9 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:bg-background/10"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
