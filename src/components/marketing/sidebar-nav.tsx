import Link from "next/link";
import { Logo } from "@/components/marketing/logo";
import { mainNav, serviceCategories, services } from "@/lib/site-config";

export function SidebarNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-y-auto border-r border-border bg-card px-5 py-6 lg:flex">
      <Logo />

      <nav className="mt-8 flex flex-col gap-0.5">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 flex-1">
        {serviceCategories.map((category) => (
          <div key={category.key} className="mb-6">
            <p className="px-3 text-xs font-semibold tracking-wide text-primary uppercase">
              {category.label}
            </p>
            <div className="mt-2 flex flex-col gap-0.5">
              {services
                .filter((service) => service.category === category.key)
                .map((service) => (
                  <Link
                    key={service.slug}
                    href={`/hizmetler/${service.slug}`}
                    className="rounded-lg px-3 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {service.label}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
