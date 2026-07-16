import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { getContactInfo } from "@/server/repositories/site-setting.repository";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { WhatsappIcon } from "@/components/marketing/social-icons";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Puhu Media ile iletişime geçin — telefon, WhatsApp, e-posta ve ofis adresi bilgileri.",
};

export const revalidate = 300;

export default async function IletisimPage() {
  const contact = await getContactInfo();

  const cards = [
    {
      icon: Phone,
      label: "Telefon",
      value: contact.phone,
      href: `tel:${contact.phoneRaw}`,
    },
    {
      icon: WhatsappIcon,
      label: "WhatsApp",
      value: "Hemen Yazın",
      href: `https://wa.me/${contact.whatsapp.replace("+", "")}`,
      external: true,
    },
    {
      icon: Mail,
      label: "E-posta",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: "Adres",
      value: contact.address,
    },
    {
      icon: Clock,
      label: "Çalışma Saatleri",
      value: contact.workingHours,
    },
  ];

  return (
    <>
      <section className="border-b border-border bg-secondary/30 section-padding">
        <div className="container-brand">
          <SectionHeading
            eyebrow="İletişim"
            title="Sizden Haber Almak İsteriz"
            description="Projeniz hakkında konuşmak için formu doldurun ya da doğrudan bize ulaşın."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="space-y-4">
              {cards.map((card) => {
                const content = (
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                      <card.icon className="size-4.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {card.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">
                        {card.value}
                      </p>
                    </div>
                  </div>
                );

                if (!card.href) {
                  return <div key={card.label}>{content}</div>;
                }

                return (
                  <a
                    key={card.label}
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noreferrer" : undefined}
                    className="block transition-opacity hover:opacity-80"
                  >
                    {content}
                  </a>
                );
              })}

              {contact.googleMapsEmbedUrl ? (
                <div className="overflow-hidden rounded-2xl border border-border">
                  <iframe
                    src={contact.googleMapsEmbedUrl}
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Puhu Media Konum"
                  />
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-heading text-xl font-medium text-foreground">
                Mesaj Gönderin
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Formu doldurun, en kısa sürede size dönüş yapalım.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
