import type { Metadata } from "next";
import { getAllInstagramPosts } from "@/server/repositories/instagram-post.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { AddPostForm } from "./add-post-form";
import { PostRow } from "./post-row";

export const metadata: Metadata = {
  title: "Instagram Gönderileri",
  robots: { index: false, follow: false },
};

export default async function AdminInstagramPage() {
  const posts = await getAllInstagramPosts();

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Instagram Gönderileri"
        description="Instagram gönderi linklerini ekleyerek sitede vitrin olarak gösterebilirsiniz. Sadece herkese açık gönderiler görüntülenir."
      />

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <AddPostForm />
      </div>

      <div className="mt-6 space-y-3">
        {posts.length === 0 ? (
          <EmptyState title="Henüz gönderi yok" description="Yukarıdaki formdan ilk gönderiyi ekleyin." />
        ) : (
          posts.map((post) => (
            <PostRow
              key={post.id}
              id={post.id}
              url={post.url}
              caption={post.caption}
              isActive={post.isActive}
            />
          ))
        )}
      </div>
    </div>
  );
}
