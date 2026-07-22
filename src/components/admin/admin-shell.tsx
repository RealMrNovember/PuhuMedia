"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GalleryHorizontal,
  FileText,
  HelpCircle,
  Building2,
  Briefcase,
  MessageSquareQuote,
  Layers,
  FileStack,
  Inbox,
  Mail,
  Image as ImageIcon,
  Settings,
  Users,
  UserRound,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { canManageUsers } from "@/lib/admin/permissions";
import { logoutAction } from "@/server/actions/logout.action";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/marketing/social-icons";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  superadminOnly?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: "Genel",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "İçerik",
    items: [
      { href: "/admin/hero-slider", label: "Hero", icon: GalleryHorizontal },
      { href: "/admin/blog", label: "Blog", icon: FileText },
      { href: "/admin/sss", label: "SSS", icon: HelpCircle },
      { href: "/admin/referanslar", label: "Referanslar", icon: Building2 },
      { href: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
      { href: "/admin/yorumlar", label: "Yorumlar", icon: MessageSquareQuote },
      { href: "/admin/instagram", label: "Instagram", icon: InstagramIcon },
      { href: "/admin/hizmetler", label: "Hizmetler", icon: Layers },
      { href: "/admin/sayfalar", label: "Sayfalar", icon: FileStack },
    ],
  },
  {
    title: "Gelen Kutusu",
    items: [
      { href: "/admin/teklifler", label: "Teklifler", icon: Inbox },
      { href: "/admin/iletisim-mesajlari", label: "İletişim", icon: Mail },
    ],
  },
  {
    title: "Medya",
    items: [{ href: "/admin/medya", label: "Medya", icon: ImageIcon }],
  },
  {
    title: "Sistem",
    items: [
      { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
      {
        href: "/admin/kullanicilar",
        label: "Kullanıcılar",
        icon: Users,
        superadminOnly: true,
      },
      { href: "/admin/profil", label: "Profil", icon: UserRound },
    ],
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({
  user,
  children,
}: {
  user: { name: string; email: string; role: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const groups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.superadminOnly || canManageUsers(user.role)
      ),
    }))
    .filter((group) => group.items.length > 0);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const nav = (
    <nav className="flex h-full flex-col">
      <div className="border-b border-border px-5 py-5">
        <Link href="/admin" className="font-heading text-lg font-medium text-foreground">
          Puhu Media
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">Yönetim Paneli</p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <item.icon className="size-4 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-4">
        <div className="mb-3 min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.role}</p>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="outline" className="w-full rounded-full">
            <LogOut className="size-4" />
            Çıkış Yap
          </Button>
        </form>
      </div>
    </nav>
  );

  return (
    <div className="min-h-svh bg-secondary/20">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card lg:block">
        {nav}
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40"
            aria-label="Menüyü kapat"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-card shadow-xl">
            <button
              type="button"
              className="absolute top-4 right-4 text-muted-foreground"
              onClick={() => setOpen(false)}
              aria-label="Kapat"
            >
              <X className="size-5" />
            </button>
            {nav}
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-border p-2 text-foreground lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Menüyü aç"
            >
              <Menu className="size-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email} · {user.role}
              </p>
            </div>
          </div>
        </header>
        <main className="px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
