import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/server/actions/logout.action";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

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

      <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        İçerik yönetimi modülleri (sayfalar, blog, referanslar, teklifler vb.)
        Faz 4 kapsamında burada yer alacak.
      </div>
    </div>
  );
}
