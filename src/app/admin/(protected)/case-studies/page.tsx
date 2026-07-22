import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllCaseStudies } from "@/server/repositories/case-study.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { deleteCaseStudyAction } from "@/server/actions/case-study.actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

export const metadata: Metadata = { title: "Case Studies", robots: { index: false, follow: false } };

export default async function AdminCaseStudiesPage() {
  const items = await getAllCaseStudies();
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Case Studies" description="Başarı hikayelerini yönetin."
        actions={<Button asChild className="rounded-full"><Link href="/admin/case-studies/yeni"><Plus className="size-4" />Yeni</Link></Button>} />
      <div className="mt-8 space-y-3">
        {items.length === 0 ? <EmptyState title="Henüz case study yok" /> : items.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/admin/case-studies/${item.id}`} className="font-heading font-medium hover:text-primary">{item.title}</Link>
                <StatusBadge variant={item.status === "PUBLISHED" ? "published" : "draft"} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{item.client} · {item.sector}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline"><Link href={`/admin/case-studies/${item.id}`}>Düzenle</Link></Button>
              <form action={async () => { "use server"; await deleteCaseStudyAction(item.id); }}>
                <ConfirmSubmitButton className="rounded-lg">Sil</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
