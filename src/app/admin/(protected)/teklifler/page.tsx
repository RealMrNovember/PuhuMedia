import type { Metadata } from "next";
import { getAllLeads } from "@/server/repositories/lead.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import { updateLeadStatusAction, deleteLeadAction } from "@/server/actions/inbox.actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Teklifler", robots: { index: false, follow: false } };

const statuses = ["NEW", "CONTACTED", "WON", "LOST"] as const;

export default async function AdminLeadsPage() {
  const leads = await getAllLeads();
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Teklif Talepleri" description="Teklif Al formundan gelen başvurular." />
      <div className="mt-8 space-y-3">
        {leads.length === 0 ? <EmptyState title="Henüz teklif yok" /> : leads.map((lead) => (
          <div key={lead.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-base font-medium">{lead.fullName}</h2>
              <StatusBadge variant={lead.status === "NEW" ? "new" : "active"} label={lead.status} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{lead.email} · {lead.phone} · {lead.service}</p>
            {lead.company ? <p className="mt-1 text-sm text-muted-foreground">Firma: {lead.company}</p> : null}
            {lead.message ? <p className="mt-3 text-sm text-foreground/80 whitespace-pre-wrap">{lead.message}</p> : null}
            <p className="mt-2 text-xs text-muted-foreground">{lead.createdAt.toLocaleString("tr-TR")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <form key={status} action={async () => { "use server"; await updateLeadStatusAction(lead.id, status); }}>
                  <Button type="submit" size="sm" variant={lead.status === status ? "default" : "outline"}>{status}</Button>
                </form>
              ))}
              <form action={async () => { "use server"; await deleteLeadAction(lead.id); }}>
                <ConfirmSubmitButton className="rounded-lg">Sil</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
