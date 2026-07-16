import Link from "next/link";
import {
  Stethoscope,
  Plane,
  Search,
  MousePointerClick,
  Megaphone,
  MessagesSquare,
  Bot,
  Palette,
  MonitorSmartphone,
  PenTool,
  Clapperboard,
  ShoppingBag,
  CalendarHeart,
  Camera,
  ArrowUpRight,
} from "lucide-react";
import { serviceCategories, services } from "@/lib/site-config";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "saglik-reklamciligi": Stethoscope,
  "saglik-turizmi-pazarlamasi": Plane,
  seo: Search,
  "google-ads": MousePointerClick,
  "meta-reklamlari": Megaphone,
  "sosyal-medya-yonetimi": MessagesSquare,
  "yapay-zeka-destekli-pazarlama": Bot,
  "kurumsal-kimlik": Palette,
  "web-tasarim": MonitorSmartphone,
  "icerik-uretimi": PenTool,
  "video-produksiyon": Clapperboard,
  "urun-fotografciligi": ShoppingBag,
  "ozel-gun-cekimleri": CalendarHeart,
  "kurumsal-fotograf": Camera,
};

export function ServicesGrid() {
  return (
    <section id="hizmetler" className="section-padding scroll-mt-24">
      <div className="container-brand">
        <SectionHeading
          eyebrow="Hizmetlerimiz"
          title="Sağlıktan genel reklamcılığa uçtan uca dijital ve yaratıcı çözümler"
          description="Sağlık reklamcılığındaki uzmanlığımızı, kurumsal markalar için sunduğumuz geniş yaratıcı ve dijital hizmet yelpazesiyle birleştiriyoruz."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-14 space-y-14">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={category.key}>
              <Reveal delay={categoryIndex * 0.05}>
                <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">
                  {category.label}
                </h3>
              </Reveal>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services
                  .filter((service) => service.category === category.key)
                  .map((service, index) => {
                    const Icon = icons[service.slug] ?? Stethoscope;
                    return (
                      <Reveal key={service.slug} delay={(index % 3) * 0.08}>
                        <Link
                          href={`/hizmetler/${service.slug}`}
                          className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                        >
                          <div className="flex size-12 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="size-5" />
                          </div>
                          <h4 className="mt-6 font-heading text-lg font-medium text-foreground">
                            {service.label}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {service.shortDescription}
                          </p>
                          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-primary">
                            Detaylı İncele
                            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </Link>
                      </Reveal>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
