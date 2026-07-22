import type { Metadata } from "next";
import Link from "next/link";
import { getAllCmsPages } from "@/server/repositories/cms-page.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";

export const metadata: Metadata = { title: "Sayfalar", robots: { index: false, follow: false } };

export default async function AdminPagesList() {
  const pages = await getAllCmsPages();
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Sayfalar" description="Hakkımızda ve yasal sayfa içeriklerini düzenleyin." />
      <div className="mt-8 space-y-3">
        {pages.length === 0 ? (
          <EmptyState title="Sayfa bulunamadı" description="Önce npm run db:seed-cms çalıştırın." />
        ) : pages.map((page) => (
          <Link key={page.id} href={`/admin/sayfalar/${page.slug}`}
            className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
            <h2 className="font-heading text-base font-medium">{page.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">/{page.slug}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
