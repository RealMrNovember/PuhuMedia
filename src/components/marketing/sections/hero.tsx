"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const badges = [
  "Sağlık Sektörüne Özel Uzmanlık",
  "SEO & Performans Odaklı",
  "Uçtan Uca Dijital Yönetim",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--background) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[600px] rounded-full bg-primary/20 blur-3xl"
      />

      <div className="container-brand relative section-padding flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/5 px-4 py-1.5 text-xs font-medium text-background/80"
        >
          <Sparkles className="size-3.5 text-primary" />
          Sağlık Reklamcılığında Uzman Dijital Ajans
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-4xl text-balance font-heading text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl md:text-6xl"
        >
          Sağlık markalarını dijitalde{" "}
          <span className="text-primary">güvenilir ve premium</span> bir
          konuma taşıyoruz
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-background/70"
        >
          Puhu Media; hastaneler, tıp merkezleri, estetik klinikleri ve sağlık
          turizmi markaları için marka yönetiminden performans pazarlamasına
          uçtan uca dijital çözümler sunan yaratıcı bir ajanstır.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full px-7 text-base shadow-lg shadow-primary/20"
          >
            <Link href="/teklif-al">
              Teklif Al
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-background/20 bg-transparent px-7 text-base text-background hover:bg-background/10 hover:text-background"
          >
            <Link href="/hizmetler/saglik-reklamciligi">
              Hizmetlerimizi İnceleyin
            </Link>
          </Button>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-background/60"
        >
          {badges.map((badge) => (
            <li key={badge} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              {badge}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
