import type { Metadata } from "next";
import { Lightbulb, Target, HeartHandshake, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBanner } from "@/components/marketing/sections/cta-banner";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Puhu Media; sağlık reklamcılığından kurumsal markalara, marka taşımak yerine marka yaratmayı hedefleyen premium yaratıcı ajanstır.",
};

const values = [
  {
    icon: Lightbulb,
    title: "Yaratıcılık",
    description:
      "Her marka için sıfırdan düşünülmüş, özgün ve akılda kalıcı fikirler üretiriz.",
  },
  {
    icon: Target,
    title: "Stratejik Bakış",
    description:
      "Yaratıcılığı ölçülebilir hedeflerle birleştirir, her kararı veriyle destekleriz.",
  },
  {
    icon: HeartHandshake,
    title: "Şeffaflık",
    description:
      "Süreç boyunca açık iletişim kurar, sonuçları dürüstçe raporlarız.",
  },
  {
    icon: Rocket,
    title: "Sürekli Gelişim",
    description:
      "Sektördeki her yeniliği takip eder, markalarımızı bir adım öne taşırız.",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/30 section-padding">
        <div className="container-brand">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              Hakkımızda
            </span>
            <h1 className="mt-4 max-w-3xl text-balance font-heading text-4xl font-medium tracking-tight text-foreground md:text-5xl">
              Marka taşımıyoruz, marka yaratıyoruz
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              Puhu Media, sağlık reklamcılığındaki uzmanlığını kurumsal
              markalara, sosyal medyadan prodüksiyona uzanan geniş bir
              yaratıcı hizmet yelpazesiyle birleştiren premium bir ajanstır.
              Var olan bir markayı yönetmekle yetinmeyiz; her projede markanın
              kendisini yeniden, daha güçlü şekilde kurgularız.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-heading text-2xl font-medium text-foreground">
              Misyonumuz
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Sağlık kurumlarının ve kurumsal markaların dijital dünyada
              güvenilir, tutarlı ve premium bir konuma ulaşmasını sağlamak.
              Her markanın kendine özgü hikayesini, doğru strateji ve yaratıcı
              üretimle en etkili şekilde anlatmasına aracı olmak.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-2xl font-medium text-foreground">
              Vizyonumuz
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Türkiye&apos;nin sağlık reklamcılığı alanında referans gösterilen,
              aynı zamanda kurumsal marka yönetimi ve dijital pazarlamada
              sektörler arası fark yaratan bir yaratıcı ajans olmak.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-secondary/40">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Değerlerimiz"
            title="Bize yön veren ilkeler"
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                    <value.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-medium text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
