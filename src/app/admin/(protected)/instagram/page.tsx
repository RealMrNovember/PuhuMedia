import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllInstagramPosts } from "@/server/repositories/instagram-post.repository";
import { AddPostForm } from "./add-post-form";
import { PostRow } from "./post-row";

export const metadata: Metadata = {
  title: "Instagram Gönderileri",
  robots: { index: false, follow: false },
};

export default async function AdminInstagramPage() {
  const posts = await getAllInstagramPosts();

  return (
    <div className="container-brand max-w-3xl py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Panele Dön
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-medium text-foreground">
        Instagram Gönderileri
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Instagram&apos;dan paylaştığınız bir gönderinin linkini ekleyerek
        sitede vitrin olarak gösterebilirsiniz. Sadece herkese açık gönderiler
        görüntülenebilir.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <AddPostForm />
      </div>

      <div className="mt-6 space-y-3">
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Henüz eklenmiş bir gönderi yok.
          </p>
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
