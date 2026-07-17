import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/server/repositories/blog.repository";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Sağlık reklamcılığı, dijital pazarlama ve marka yönetimi üzerine içgörüler.",
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts(50);

  return (
    <>
      <section className="border-b border-border bg-secondary/30 section-padding">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Blog"
            title="Sektörden içgörüler"
            description="Sağlık reklamcılığı, dijital pazarlama ve marka yaratma üzerine yazılar."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand">
          {posts.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              Yazılarımız yakında burada yer alacak.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.id} delay={(index % 3) * 0.08}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <div className="mt-4">
                      {post.category ? (
                        <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                          {post.category.name}
                        </span>
                      ) : null}
                      <h3 className="mt-2 font-heading text-lg font-medium text-foreground">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
