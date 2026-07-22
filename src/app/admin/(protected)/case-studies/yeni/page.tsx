import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { createCaseStudyAction } from "@/server/actions/case-study.actions";
import { CaseStudyForm } from "../case-study-form";

export const metadata: Metadata = { title: "Yeni Case Study", robots: { index: false, follow: false } };

export default function NewCaseStudyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Yeni Case Study" />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <CaseStudyForm action={createCaseStudyAction} />
      </div>
    </div>
  );
}
