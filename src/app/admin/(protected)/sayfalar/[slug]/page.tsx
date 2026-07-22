import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import {
  asAboutContent,
  asLegalContent,
  getCmsPageBySlug,
} from "@/server/repositories/cms-page.repository";
import { AboutPageForm, LegalPageForm } from "../page-forms";
import {
  updateAboutPageAction,
  updateLegalPageAction,
} from "@/server/actions/cms-page.actions";

export const metadata: Metadata = { title: "Sayfa Düzenle", robots: { index: false, follow: false } };

export default async function EditCmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getCmsPageBySlug(slug);
  if (!page) notFound();

  if (slug === "hakkimizda") {
    const content = asAboutContent(page.content);
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Hakkımızda" description="Sayfa içeriğini düzenleyin." />
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <AboutPageForm
            action={updateAboutPageAction}
            defaults={{
              title: page.title,
              seoTitle: page.seoTitle ?? "",
              seoDescription: page.seoDescription ?? "",
              heroTitle: content?.heroTitle ?? "",
              heroBody: content?.heroBody ?? "",
              mission: content?.mission ?? "",
              vision: content?.vision ?? "",
              values: content?.values ?? [],
            }}
          />
        </div>
      </div>
    );
  }

  const legal = asLegalContent(page.content);
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={page.title} description={`/${slug}`} />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <LegalPageForm
          action={updateLegalPageAction.bind(null, slug)}
          defaults={{
            title: page.title,
            seoTitle: page.seoTitle ?? "",
            seoDescription: page.seoDescription ?? "",
            html: legal?.html ?? "",
          }}
        />
      </div>
    </div>
  );
}
