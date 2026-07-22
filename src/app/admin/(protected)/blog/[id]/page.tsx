import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { getBlogPostById } from "@/server/repositories/blog.repository";
import { updateBlogPostAction } from "@/server/actions/blog.actions";
import { BlogForm } from "../blog-form";

export const metadata: Metadata = { title: "Blog Düzenle", robots: { index: false, follow: false } };

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) notFound();
  const action = updateBlogPostAction.bind(null, id);
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Yazıyı Düzenle" description={post.title} />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <BlogForm action={action} defaults={{
          title: post.title, slug: post.slug, excerpt: post.excerpt, contentHtml: post.contentHtml,
          status: post.status, seoTitle: post.seoTitle ?? "", seoDescription: post.seoDescription ?? "",
          coverImage: post.coverImage,
        }} />
      </div>
    </div>
  );
}
