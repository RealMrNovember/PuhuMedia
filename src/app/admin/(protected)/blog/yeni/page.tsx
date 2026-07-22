import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { createBlogPostAction } from "@/server/actions/blog.actions";
import { BlogForm } from "../blog-form";

export const metadata: Metadata = { title: "Yeni Blog Yazısı", robots: { index: false, follow: false } };

export default function NewBlogPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Yeni Blog Yazısı" description="Yeni bir yazı oluşturun." />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <BlogForm action={createBlogPostAction} />
      </div>
    </div>
  );
}
