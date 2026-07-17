import type { Metadata } from "next";
import { getPublishedFaqs } from "@/server/repositories/faq.repository";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaBanner } from "@/components/marketing/sections/cta-banner";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description: "Puhu Media hizmetleri hakkında sık sorulan sorular.",
};

export const revalidate = 300;

export default async function SssPage() {
  const faqs = await getPublishedFaqs();

  return (
    <>
      <section className="border-b border-border bg-secondary/30 section-padding">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Sık Sorulan Sorular"
            title="Merak edilenler"
            description="Hizmetlerimiz, süreçlerimiz ve çalışma şeklimiz hakkında en çok sorulan sorular."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-3xl">
          {faqs.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              Sorular yakında burada yer alacak.
            </p>
          ) : (
            <Reveal>
              <Accordion type="single" collapsible>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
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
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
