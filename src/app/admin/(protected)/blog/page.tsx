import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllBlogPosts } from "@/server/repositories/blog.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { deleteBlogPostAction, toggleBlogStatusAction } from "@/server/actions/blog.actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

export const metadata: Metadata = { title: "Blog", robots: { index: false, follow: false } };

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Blog" description="Blog yazılarını oluşturun, düzenleyin ve yayınlayın."
        actions={<Button asChild className="rounded-full"><Link href="/admin/blog/yeni"><Plus className="size-4" />Yeni Yazı</Link></Button>} />
      <div className="mt-8 space-y-3">
        {posts.length === 0 ? (
          <EmptyState title="Henüz yazı yok" description="İlk blog yazınızı oluşturun." />
        ) : posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/admin/blog/${post.id}`} className="font-heading text-base font-medium text-foreground hover:text-primary">{post.title}</Link>
                <StatusBadge variant={post.status === "PUBLISHED" ? "published" : "draft"} />
              </div>
              <p className="mt-1 truncate text-sm text-muted-foreground">/{post.slug} · {post.author.name}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <form action={async () => { "use server"; await toggleBlogStatusAction(post.id); }}>
                <Button type="submit" variant="outline" size="sm">{post.status === "PUBLISHED" ? "Taslağa al" : "Yayınla"}</Button>
              </form>
              <Button asChild variant="outline" size="sm"><Link href={`/admin/blog/${post.id}`}>Düzenle</Link></Button>
              <form action={async () => { "use server"; await deleteBlogPostAction(post.id); }}>
                <ConfirmSubmitButton className="rounded-lg">Sil</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
