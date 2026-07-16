import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import {
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/marketing/social-icons";
import { Separator } from "@/components/ui/separator";
import {
  legalNav,
  mainNav,
  serviceCategories,
  services,
  siteConfig,
} from "@/lib/site-config";
import { getContactInfo } from "@/server/repositories/site-setting.repository";
import { cn } from "@/lib/utils";

export async function SiteFooter({ className }: { className?: string }) {
  const year = new Date().getFullYear();
  const contact = await getContactInfo();
  const footerServices = serviceCategories.flatMap(
    (category) =>
      services.filter((service) => service.category === category.key).slice(0, 2)
  );

  return (
    <footer className={cn("border-t border-border bg-secondary/40", className)}>
      <div className="container-brand grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5 lg:py-20">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={contact.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={contact.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href={contact.social.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <YoutubeIcon className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Kurumsal</h3>
          <ul className="mt-4 space-y-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Hizmetler</h3>
          <ul className="mt-4 space-y-3">
            {footerServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">İletişim</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <a
                href={`tel:${contact.phoneRaw}`}
                className="transition-colors hover:text-foreground"
              >
                {contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <WhatsappIcon className="mt-0.5 size-4 shrink-0" />
              <a
                href={`https://wa.me/${contact.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                WhatsApp ile Yazın
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-foreground"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <Separator />

      <div className="container-brand flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
        <p>
          © {year} {siteConfig.name}. Tüm hakları saklıdır.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {legalNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <a
          href="https://cicibyte.com"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground/80 transition-colors hover:text-foreground"
        >
          Tasarım &amp; Geliştirme:{" "}
          <span className="font-medium">Cicibyte Corp</span>
        </a>
      </div>
    </footer>
  );
}
