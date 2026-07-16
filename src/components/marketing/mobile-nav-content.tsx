import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNav, serviceCategories, services } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNavContent({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav className="flex flex-col gap-1 px-4 pb-8">
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
        >
          {item.label}
        </Link>
      ))}
      {serviceCategories.map((category) => (
        <div key={category.key}>
          <p className="mt-4 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {category.label}
          </p>
          {services
            .filter((service) => service.category === category.key)
            .map((service) => (
              <Link
                key={service.slug}
                href={`/hizmetler/${service.slug}`}
                onClick={onNavigate}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                )}
              >
                {service.label}
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
        </div>
      ))}
      <Button asChild className="mt-6 w-full rounded-full">
        <Link href="/teklif-al" onClick={onNavigate}>
          Teklif Al
        </Link>
      </Button>
    </nav>
  );
}
