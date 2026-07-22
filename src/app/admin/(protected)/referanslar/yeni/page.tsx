import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { createReferenceAction } from "@/server/actions/reference.actions";
import { ReferenceForm } from "../reference-form";

export const metadata: Metadata = { title: "Yeni Referans", robots: { index: false, follow: false } };

export default function NewReferencePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Yeni Referans" />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <ReferenceForm action={createReferenceAction} />
      </div>
    </div>
  );
}
