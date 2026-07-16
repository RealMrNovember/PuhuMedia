import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { services, serviceCategories } from "@/lib/site-config";
import { servicesContent } from "@/lib/services-content";
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

export const revalidate = 3600;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const content = servicesContent[slug];
  if (!service || !content) return {};

  return {
    title: service.label,
    description: content.heroDescription,
    openGraph: {
      title: `${service.label} | Puhu Media`,
      description: content.heroDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const content = servicesContent[slug];

  if (!service || !content) notFound();

  const Icon = serviceIcons[slug];
  const category = serviceCategories.find((c) => c.key === service.category);
  const related = services
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
            <Button asChild size="lg" className="mt-9 rounded-full px-7">
              <Link href="/teklif-al">
                Teklif Al
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="font-heading text-2xl font-medium text-foreground">
                Genel Bakış
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                {content.overview.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {content.features.map((feature, index) => (
              <Reveal key={feature.title} delay={(index % 2) * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Check className="size-4" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-medium text-foreground">
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
        <section className="section-padding bg-secondary/40">
          <div className="container-brand max-w-3xl">
            <SectionHeading
              eyebrow="Sık Sorulan Sorular"
              title={`${service.label} hakkında merak edilenler`}
            />
            <Reveal delay={0.1} className="mt-8">
              <Accordion type="single" collapsible>
                {content.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-heading text-base font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="section-padding">
          <div className="container-brand">
            <SectionHeading eyebrow={category?.label} title="İlgili Hizmetler" />
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {related.map((relatedService, index) => {
                const RelatedIcon = serviceIcons[relatedService.slug];
                return (
                  <Reveal key={relatedService.slug} delay={index * 0.08}>
                    <Link
                      href={`/hizmetler/${relatedService.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                    >
                      {RelatedIcon ? (
                        <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <RelatedIcon className="size-4.5" />
                        </div>
                      ) : null}
                      <h3 className="mt-4 font-heading text-base font-medium text-foreground">
                        {relatedService.label}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {relatedService.shortDescription}
                      </p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner />
    </>
  );
}
