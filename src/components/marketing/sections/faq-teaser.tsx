import Link from "next/link";
import { getPublishedFaqs } from "@/server/repositories/faq.repository";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export async function FaqTeaser() {
  const faqs = await getPublishedFaqs(6);

  if (faqs.length === 0) return null;

  return (
    <section className="section-padding bg-secondary/40">
      <div className="container-brand grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Sık Sorulan Sorular"
            title="Merak edilenler"
          />
          <Button asChild variant="outline" className="mt-6 rounded-full">
            <Link href="/sss">Tüm Soruları Görüntüle</Link>
          </Button>
        </div>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
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
      </div>
    </section>
  );
}
