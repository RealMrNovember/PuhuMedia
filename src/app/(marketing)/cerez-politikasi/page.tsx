import type { Metadata } from "next";
import { LegalHtml, LegalPageShell } from "@/components/marketing/legal-page";
import {
  asLegalContent,
  getCmsPageBySlug,
} from "@/server/repositories/cms-page.repository";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPageBySlug("cerez-politikasi");
  return {
    title: page?.seoTitle ?? page?.title ?? "Çerez Politikası",
    robots: { index: false, follow: true },
  };
}

export default async function CerezPolitikasiPage() {
  const page = await getCmsPageBySlug("cerez-politikasi");
  const legal = asLegalContent(page?.content);

  if (!legal) {
    return (
      <LegalPageShell title="Çerez Politikası">
        <p>İçerik yakında güncellenecektir.</p>
      </LegalPageShell>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-brand max-w-3xl">
        <h1 className="font-heading text-3xl font-medium text-foreground">
          {page?.title ?? "Çerez Politikası"}
        </h1>
        <LegalHtml html={legal.html} />
      </div>
    </section>
  );
}
