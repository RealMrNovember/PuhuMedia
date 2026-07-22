import type { Metadata } from "next";
import { getAllFaqs } from "@/server/repositories/faq.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import {
  deleteFaqAction,
  moveFaqAction,
  toggleFaqAction,
} from "@/server/actions/faq.actions";
import { FaqCreateForm, FaqEditForm } from "./faq-forms";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

export const metadata: Metadata = { title: "SSS", robots: { index: false, follow: false } };

export default async function AdminFaqPage() {
  const faqs = await getAllFaqs();
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="SSS" description="Sık sorulan soruları yönetin ve sıralayın." />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-heading text-lg font-medium">Yeni soru ekle</h2>
        <div className="mt-4"><FaqCreateForm /></div>
      </div>
      <div className="mt-6 space-y-4">
        {faqs.length === 0 ? (
          <EmptyState title="Henüz SSS yok" />
        ) : faqs.map((faq, index) => (
          <div key={faq.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <StatusBadge variant={faq.isPublished ? "published" : "draft"} />
              <span className="text-xs text-muted-foreground">Sıra: {index + 1}</span>
            </div>
            <FaqEditForm
              id={faq.id}
              defaults={{ question: faq.question, answer: faq.answer, category: faq.category ?? "" }}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <form action={async () => { "use server"; await toggleFaqAction(faq.id, !faq.isPublished); }}>
                <Button type="submit" size="sm" variant="outline">{faq.isPublished ? "Gizle" : "Yayınla"}</Button>
              </form>
              <form action={async () => { "use server"; await moveFaqAction(faq.id, "up"); }}>
                <Button type="submit" size="sm" variant="outline" disabled={index === 0}>Yukarı</Button>
              </form>
              <form action={async () => { "use server"; await moveFaqAction(faq.id, "down"); }}>
                <Button type="submit" size="sm" variant="outline" disabled={index === faqs.length - 1}>Aşağı</Button>
              </form>
              <form action={async () => { "use server"; await deleteFaqAction(faq.id); }}>
                <ConfirmSubmitButton className="rounded-lg">Sil</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
