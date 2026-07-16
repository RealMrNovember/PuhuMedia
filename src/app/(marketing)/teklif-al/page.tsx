import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { getContactInfo } from "@/server/repositories/site-setting.repository";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { WhatsappIcon } from "@/components/marketing/social-icons";
import { LeadForm } from "./lead-form";

export const metadata: Metadata = {
  title: "Teklif Al",
  description:
    "Projeniz için Puhu Media'dan özel teklif alın — sağlık reklamcılığı, dijital pazarlama ve prodüksiyon hizmetleri.",
};

export const revalidate = 300;

export default async function TeklifAlPage() {
  const contact = await getContactInfo();

  return (
    <section className="section-padding">
      <div className="container-brand grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Teklif Al"
            title="Projeniz için özel teklif alın"
            description="Formu doldurun, ekibimiz ihtiyaçlarınıza en uygun stratejiyi ve teklifi sizinle paylaşsın."
          />

          <div className="mt-10 space-y-3">
            <a
              href={`tel:${contact.phoneRaw}`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
            >
              <Phone className="size-4 text-primary" />
              {contact.phone}
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
            >
              <WhatsappIcon className="size-4 text-primary" />
              WhatsApp ile Yazın
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
