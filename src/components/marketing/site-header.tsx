"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { MobileNavContent } from "@/components/marketing/mobile-nav-content";
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
import { mainNav, serviceCategories, services } from "@/lib/site-config";
import type { NavStyle } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader({
  navStyle = "bottombar",
  phone,
  phoneRaw,
}: {
  navStyle?: NavStyle;
  phone: string;
  phoneRaw: string;
}) {
  const [open, setOpen] = React.useState(false);

  const isSidebar = navStyle === "sidebar";

  return (
    <header className={cn("sticky top-0 z-50 w-full", isSidebar && "lg:pl-64")}>
      <div className="glass-surface">
        <div className="container-brand flex h-18 items-center justify-between py-3">
          <Logo className={cn(isSidebar && "lg:hidden")} />

          <NavigationMenu
            viewport={false}
            className={cn("hidden lg:flex", isSidebar && "lg:hidden")}
          >
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
              href={`tel:${phoneRaw}`}
              className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              <Phone className="size-3.5" />
              {phone}
            </a>
            <ThemeToggle />
            <Button asChild className="rounded-full px-5">
              <Link href="/teklif-al">Teklif Al</Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            {navStyle !== "bottombar" && (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menüyü aç">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Logo />
                    </SheetTitle>
                  </SheetHeader>
                  <MobileNavContent onNavigate={() => setOpen(false)} />
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
