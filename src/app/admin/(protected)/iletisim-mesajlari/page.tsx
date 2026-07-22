import type { Metadata } from "next";
import { getAllContacts } from "@/server/repositories/contact.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import { markContactReadAction, deleteContactAction } from "@/server/actions/inbox.actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "İletişim Mesajları", robots: { index: false, follow: false } };

export default async function AdminContactsPage() {
  const items = await getAllContacts();
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="İletişim Mesajları" description="İletişim formundan gelen mesajlar." />
      <div className="mt-8 space-y-3">
        {items.length === 0 ? <EmptyState title="Henüz mesaj yok" /> : items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-base font-medium">{item.fullName}</h2>
              <StatusBadge variant={item.isRead ? "inactive" : "new"} label={item.isRead ? "Okundu" : "Yeni"} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{item.email}{item.phone ? ` · ${item.phone}` : ""}{item.subject ? ` · ${item.subject}` : ""}</p>
            <p className="mt-3 text-sm whitespace-pre-wrap text-foreground/80">{item.message}</p>
            <p className="mt-2 text-xs text-muted-foreground">{item.createdAt.toLocaleString("tr-TR")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <form action={async () => { "use server"; await markContactReadAction(item.id, !item.isRead); }}>
                <Button type="submit" size="sm" variant="outline">{item.isRead ? "Okunmadı yap" : "Okundu işaretle"}</Button>
              </form>
              <form action={async () => { "use server"; await deleteContactAction(item.id); }}>
                <ConfirmSubmitButton className="rounded-lg">Sil</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
