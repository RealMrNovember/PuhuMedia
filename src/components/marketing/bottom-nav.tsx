"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Menu, Send } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/marketing/logo";
import { WhatsappIcon } from "@/components/marketing/social-icons";
import { MobileNavContent } from "@/components/marketing/mobile-nav-content";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Ana Sayfa", href: "/", icon: Home },
  { label: "Hizmetler", href: "/#hizmetler", icon: LayoutGrid },
];

export function BottomNav({ whatsapp }: { whatsapp: string }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  if (pathname?.startsWith("/admin")) return null;

  const whatsappMessage = encodeURIComponent(
    "Merhaba, Puhu Media hakkında bilgi almak istiyorum."
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden">
      <div className="flex items-center justify-around px-1 py-1.5">
        {tabs.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname?.startsWith(tab.href.split("#")[0]);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <tab.icon className="size-5" />
              {tab.label}
            </Link>
          );
        })}

        <Link
          href="/teklif-al"
          className="flex flex-1 flex-col items-center gap-1"
        >
          <span className="-mt-6 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Send className="size-5" />
          </span>
          <span className="text-[11px] font-medium text-primary">Teklif Al</span>
        </Link>

        <a
          href={`https://wa.me/${whatsapp.replace("+", "")}?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors"
        >
          <WhatsappIcon className="size-5 text-[#25D366]" />
          WhatsApp
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors"
            >
              <Menu className="size-5" />
              Menü
            </button>
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
      </div>
    </nav>
  );
}
