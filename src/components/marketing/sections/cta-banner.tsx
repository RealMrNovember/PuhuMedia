import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";
import { siteConfig } from "@/lib/site-config";

export function CtaBanner() {
  return (
    <section className="section-padding">
      <div className="container-brand">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-center text-background sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
            />
            <div className="relative">
              <h2 className="text-balance font-heading text-3xl font-medium tracking-tight md:text-4xl">
                Markanızı bir sonraki seviyeye taşımaya hazır mısınız?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-balance text-background/70">
                Sağlık markanız için özel hazırlanmış bir strateji görüşmesi
                planlayalım.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-7 text-base"
                >
                  <Link href="/teklif-al">
                    Teklif Al
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="text-sm font-medium text-background/80 underline-offset-4 hover:underline"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
