import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { getReferenceById } from "@/server/repositories/reference.repository";
import { updateReferenceAction } from "@/server/actions/reference.actions";
import { ReferenceForm } from "../reference-form";

export const metadata: Metadata = { title: "Referans Düzenle", robots: { index: false, follow: false } };

export default async function EditReferencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getReferenceById(id);
  if (!item) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Referansı Düzenle" description={item.name} />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <ReferenceForm
          action={updateReferenceAction.bind(null, id)}
          defaults={{
            name: item.name, slug: item.slug, sector: item.sector, description: item.description,
            results: item.results ?? "", servicesUsed: item.servicesUsed.join(", "),
            logo: item.logo, isFeatured: item.isFeatured, isPublished: item.isPublished,
          }}
        />
      </div>
    </div>
  );
}
