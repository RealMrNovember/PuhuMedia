"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Phone, ChevronRight } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  mainNav,
  serviceCategories,
  services,
  siteConfig,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-surface">
        <div className="container-brand flex h-18 items-center justify-between py-3">
          <Logo />

          <NavigationMenu viewport={false} className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  <Link href="/hakkimizda">Hakkımızda</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 data-[state=open]:text-foreground">
                  Hizmetler
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[820px] grid-cols-4 gap-6 p-5">
                    {serviceCategories.map((category) => (
                      <div key={category.key}>
                        <p className="px-1 text-xs font-semibold tracking-wide text-primary uppercase">
                          {category.label}
                        </p>
                        <ul className="mt-2 space-y-0.5">
                          {services
                            .filter((service) => service.category === category.key)
                            .map((service) => (
                              <li key={service.slug}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={`/hizmetler/${service.slug}`}
                                    className="block rounded-lg px-2 py-2 text-sm font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-foreground"
                                  >
                                    {service.label}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {mainNav.slice(2).map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              <Phone className="size-3.5" />
              {siteConfig.contact.phone}
            </a>
            <Button asChild className="rounded-full px-5">
              <Link href="/teklif-al">Teklif Al</Link>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menüyü aç">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
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
                          onClick={() => setOpen(false)}
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
                  <Link href="/teklif-al" onClick={() => setOpen(false)}>
                    Teklif Al
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
