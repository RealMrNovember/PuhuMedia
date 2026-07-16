import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedCaseStudies } from "@/server/repositories/case-study.repository";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";

export async function CaseStudiesTeaser() {
  const caseStudies = await getPublishedCaseStudies(3);

  if (caseStudies.length === 0) return null;

  return (
    <section className="section-padding bg-secondary/40">
      <div className="container-brand">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Başarı Hikayeleri"
            title="Sonuç odaklı vaka analizlerimiz"
          />
          <Link
            href="/vaka-analizleri"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Tüm Vaka Analizleri
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((caseStudy, index) => (
            <Reveal key={caseStudy.id} delay={index * 0.1}>
              <Link
                href={`/vaka-analizleri/${caseStudy.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={caseStudy.coverImage}
                    alt={caseStudy.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                    {caseStudy.sector}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-medium text-foreground">
                    {caseStudy.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
