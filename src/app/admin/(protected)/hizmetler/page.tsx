import type { Metadata } from "next";
import Link from "next/link";
import { getAllServicePages } from "@/server/repositories/service-page.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import { toggleServicePageAction } from "@/server/actions/service-page.actions";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Hizmetler", robots: { index: false, follow: false } };

export default async function AdminServicesPage() {
  const items = await getAllServicePages();
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Hizmetler" description="Hizmet sayfası içeriklerini düzenleyin." />
      <div className="mt-8 space-y-3">
        {items.length === 0 ? (
          <EmptyState title="Hizmet bulunamadı" description="npm run db:seed-cms çalıştırın." />
        ) : items.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/admin/hizmetler/${item.slug}`} className="font-heading font-medium hover:text-primary">{item.label}</Link>
                <StatusBadge variant={item.isPublished ? "published" : "draft"} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{item.shortDescription}</p>
            </div>
            <div className="flex gap-2">
              <form action={async () => { "use server"; await toggleServicePageAction(item.slug, !item.isPublished); }}>
                <Button type="submit" size="sm" variant="outline">{item.isPublished ? "Gizle" : "Yayınla"}</Button>
              </form>
              <Button asChild size="sm" variant="outline"><Link href={`/admin/hizmetler/${item.slug}`}>Düzenle</Link></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
