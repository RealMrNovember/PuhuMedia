import type { Metadata } from "next";
import Image from "next/image";
import { getPublishedReferences } from "@/server/repositories/reference.repository";
import { services } from "@/lib/site-config";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Referanslar",
  description:
    "Puhu Media'nın sağlık ve kurumsal sektörlerden iş birliği yaptığı markalar.",
};

export const revalidate = 300;

export default async function ReferanslarPage() {
  const references = await getPublishedReferences(50);

  return (
    <>
      <section className="border-b border-border bg-secondary/30 section-padding">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Referanslarımız"
            title="Güvenle çalıştığımız markalar"
            description="Sağlık reklamcılığından kurumsal markalara, farklı sektörlerden markalarla yürüttüğümüz iş birliklerinden bazıları."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand">
          {references.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              Referanslar yakında burada yer alacak.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {references.map((reference, index) => (
                <Reveal key={reference.id} delay={(index % 3) * 0.08}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                    <Image
                      src={reference.logo}
                      alt={reference.name}
                      width={160}
                      height={44}
                      className="h-9 w-auto object-contain"
                    />
                    <span className="mt-5 text-xs font-semibold tracking-wide text-primary uppercase">
                      {reference.sector}
                    </span>
                    <h3 className="mt-1.5 font-heading text-lg font-medium text-foreground">
                      {reference.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {reference.description}
                    </p>
                    {reference.servicesUsed.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {reference.servicesUsed.map((slug) => {
                          const service = services.find((s) => s.slug === slug);
                          if (!service) return null;
                          return (
                            <Badge key={slug} variant="secondary" className="font-normal">
                              {service.label}
                            </Badge>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
