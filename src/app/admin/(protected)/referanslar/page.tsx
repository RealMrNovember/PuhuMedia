import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllReferences } from "@/server/repositories/reference.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { deleteReferenceAction, toggleReferenceAction } from "@/server/actions/reference.actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

export const metadata: Metadata = { title: "Referanslar", robots: { index: false, follow: false } };

export default async function AdminReferencesPage() {
  const items = await getAllReferences();
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Referanslar" description="Müşteri referanslarını yönetin."
        actions={<Button asChild className="rounded-full"><Link href="/admin/referanslar/yeni"><Plus className="size-4" />Yeni Referans</Link></Button>} />
      <div className="mt-8 space-y-3">
        {items.length === 0 ? <EmptyState title="Henüz referans yok" /> : items.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/admin/referanslar/${item.id}`} className="font-heading font-medium hover:text-primary">{item.name}</Link>
                <StatusBadge variant={item.isPublished ? "published" : "draft"} />
                {item.isFeatured ? <StatusBadge variant="active" label="Öne çıkan" /> : null}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{item.sector}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <form action={async () => { "use server"; await toggleReferenceAction(item.id, !item.isPublished); }}>
                <Button type="submit" size="sm" variant="outline">{item.isPublished ? "Gizle" : "Yayınla"}</Button>
              </form>
              <Button asChild size="sm" variant="outline"><Link href={`/admin/referanslar/${item.id}`}>Düzenle</Link></Button>
              <form action={async () => { "use server"; await deleteReferenceAction(item.id); }}>
                <ConfirmSubmitButton className="rounded-lg">Sil</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
