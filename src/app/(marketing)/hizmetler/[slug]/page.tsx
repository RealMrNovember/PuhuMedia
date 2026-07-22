import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { serviceCategories, services } from "@/lib/site-config";
import { serviceIcons } from "@/lib/service-icons";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBanner } from "@/components/marketing/sections/cta-banner";
import {
  getPublishedServicePages,
  resolveServicePage,
} from "@/server/repositories/service-page.repository";

export const revalidate = 300;

export async function generateStaticParams() {
  const rows = await getPublishedServicePages();
  if (rows.length > 0) {
    return rows.map((service) => ({ slug: service.slug }));
  }
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await resolveServicePage(slug);
  if (!service) return {};

  return {
    title: service.seoTitle ?? service.label,
    description: service.seoDescription ?? service.content.heroDescription,
    openGraph: {
      title: `${service.label} | Puhu Media`,
      description: service.seoDescription ?? service.content.heroDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await resolveServicePage(slug);
  if (!service) notFound();

  const { content } = service;
  const Icon = serviceIcons[slug];
  const category = serviceCategories.find((c) => c.key === service.category);

  const allPublished = await getPublishedServicePages();
  const relatedSource =
    allPublished.length > 0
      ? allPublished.map((s) => ({
          slug: s.slug,
          label: s.label,
          shortDescription: s.shortDescription,
          category: s.category,
        }))
      : services;

  const related = relatedSource
    .filter((s) => s.category === service.category && s.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-secondary/30 section-padding">
        <div className="container-brand">
          <Reveal>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-primary uppercase">
              {Icon ? <Icon className="size-4" /> : null}
              {category?.label}
            </div>
            <h1 className="mt-4 max-w-3xl text-balance font-heading text-4xl font-medium tracking-tight text-foreground md:text-5xl">
              {service.label}
            </h1>
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              {content.heroDescription}
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-foreground/70">
              {content.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {highlight}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-10 rounded-full">
              <Link href="/teklif-al">
                Teklif Alın
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5">
            {content.overview.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 24)}>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-heading text-lg font-medium text-foreground">
                Neler sunuyoruz?
              </h2>
              <ul className="mt-5 space-y-3">
                {content.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-secondary/40">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Kapsam"
            title="Hizmetin temel bileşenleri"
            className="max-w-2xl"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {content.features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-heading text-base font-medium text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {content.faqs.length > 0 ? (
        <section className="section-padding">
          <div className="container-brand max-w-3xl">
            <SectionHeading
              eyebrow="SSS"
              title="Sık sorulan sorular"
              className="max-w-xl"
            />
            <Accordion type="single" collapsible className="mt-10">
              {content.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="section-padding border-t border-border">
          <div className="container-brand">
            <SectionHeading
              eyebrow="İlgili"
              title="Aynı kategorideki diğer hizmetler"
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/hizmetler/${item.slug}`}
                  className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <h3 className="font-heading text-base font-medium text-foreground">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner />
    </>
  );
}
