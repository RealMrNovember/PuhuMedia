import type { Metadata } from "next";
import { getAllTestimonials } from "@/server/repositories/testimonial.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import {
  createTestimonialAction,
  deleteTestimonialAction,
  moveTestimonialAction,
  toggleTestimonialAction,
  updateTestimonialAction,
} from "@/server/actions/testimonial.actions";
import { TestimonialForm } from "./testimonial-form";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

export const metadata: Metadata = { title: "Yorumlar", robots: { index: false, follow: false } };

export default async function AdminTestimonialsPage() {
  const items = await getAllTestimonials();
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Müşteri Yorumları" description="Ana sayfada görünen yorumları yönetin." />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-heading text-lg font-medium">Yeni yorum</h2>
        <div className="mt-4"><TestimonialForm action={createTestimonialAction} /></div>
      </div>
      <div className="mt-6 space-y-4">
        {items.length === 0 ? <EmptyState title="Henüz yorum yok" /> : items.map((item, index) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <StatusBadge variant={item.isPublished ? "published" : "draft"} />
              <span className="text-xs text-muted-foreground">{item.name} · {item.company}</span>
            </div>
            <TestimonialForm
              action={updateTestimonialAction.bind(null, item.id)}
              defaults={{
                name: item.name, role: item.role, company: item.company,
                quote: item.quote, rating: item.rating, photo: item.photo,
              }}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <form action={async () => { "use server"; await toggleTestimonialAction(item.id, !item.isPublished); }}>
                <Button type="submit" size="sm" variant="outline">{item.isPublished ? "Gizle" : "Yayınla"}</Button>
              </form>
              <form action={async () => { "use server"; await moveTestimonialAction(item.id, "up"); }}>
                <Button type="submit" size="sm" variant="outline" disabled={index === 0}>Yukarı</Button>
              </form>
              <form action={async () => { "use server"; await moveTestimonialAction(item.id, "down"); }}>
                <Button type="submit" size="sm" variant="outline" disabled={index === items.length - 1}>Aşağı</Button>
              </form>
              <form action={async () => { "use server"; await deleteTestimonialAction(item.id); }}>
                <ConfirmSubmitButton className="rounded-lg">Sil</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
