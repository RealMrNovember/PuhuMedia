import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { getCaseStudyById } from "@/server/repositories/case-study.repository";
import { updateCaseStudyAction } from "@/server/actions/case-study.actions";
import { CaseStudyForm } from "../case-study-form";

export const metadata: Metadata = { title: "Case Study Düzenle", robots: { index: false, follow: false } };

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getCaseStudyById(id);
  if (!item) notFound();
  const resultsText = Array.isArray(item.results)
    ? (item.results as string[]).join("\n")
    : typeof item.results === "string"
      ? item.results
      : "";
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Case Study Düzenle" description={item.title} />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <CaseStudyForm
          action={updateCaseStudyAction.bind(null, id)}
          defaults={{
            title: item.title, slug: item.slug, client: item.client, sector: item.sector,
            problem: item.problem, solution: item.solution, strategy: item.strategy, process: item.process,
            resultsText, ctaText: item.ctaText, status: item.status, coverImage: item.coverImage,
            seoTitle: item.seoTitle, seoDescription: item.seoDescription,
          }}
        />
      </div>
    </div>
  );
}
