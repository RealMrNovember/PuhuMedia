import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import {
  asServiceContent,
  getServicePageBySlug,
} from "@/server/repositories/service-page.repository";
import { updateServicePageAction } from "@/server/actions/service-page.actions";
import { ServicePageForm } from "../service-form";

export const metadata: Metadata = { title: "Hizmet Düzenle", robots: { index: false, follow: false } };

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getServicePageBySlug(slug);
  if (!item) notFound();
  const content = asServiceContent(item.content);
  if (!content) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={item.label} description={`/hizmetler/${slug}`} />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <ServicePageForm
          action={updateServicePageAction.bind(null, slug)}
          defaults={{
            label: item.label,
            shortDescription: item.shortDescription,
            category: item.category,
            seoTitle: item.seoTitle ?? "",
            seoDescription: item.seoDescription ?? "",
            isPublished: item.isPublished,
            content,
          }}
        />
      </div>
    </div>
  );
}
