import type { Metadata } from "next";
import Link from "next/link";
import { Settings } from "lucide-react";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/server/actions/logout.action";
import { InstagramIcon } from "@/components/marketing/social-icons";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

const modules = [
  {
    href: "/admin/ayarlar",
    label: "Site Ayarları",
    description: "İletişim bilgileri, sosyal medya, menü stili, analitik",
    icon: Settings,
  },
  {
    href: "/admin/instagram",
    label: "Instagram Gönderileri",
    description: "Sitede gösterilecek Instagram gönderilerini yönet",
    icon: InstagramIcon,
  },
];

export default async function AdminDashboardPage() {
  const session = await auth();

  return (
    <div className="container-brand py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-foreground">
            Yönetim Paneli
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Hoş geldiniz, {session?.user?.name} ({session?.user?.role})
          </p>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="outline" className="rounded-full">
            Çıkış Yap
          </Button>
        </form>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <module.icon className="size-5" />
            </div>
            <div>
              <h2 className="font-heading text-base font-medium text-foreground">
                {module.label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {module.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        Diğer içerik yönetimi modülleri (sayfalar, blog, referanslar,
        teklifler vb.) sonraki fazlarda burada yer alacak.
      </div>
    </div>
  );
}
