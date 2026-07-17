import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import { getBlogPostBySlug } from "@/server/repositories/blog.repository";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBanner } from "@/components/marketing/sections/cta-banner";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.ogImage ? [post.ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <article className="section-padding">
        <div className="container-brand max-w-3xl">
          <Reveal>
            {post.category ? (
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                {post.category.name}
              </span>
            ) : null}
            <h1 className="mt-3 text-balance font-heading text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              {post.publishedAt ? (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4" />
                  {new Intl.DateTimeFormat("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(post.publishedAt)}
                </span>
              ) : null}
              {post.readingTimeMin ? (
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  {post.readingTimeMin} dk okuma
                </span>
              ) : null}
            </div>
          </Reveal>

          {post.coverImage ? (
            <Reveal delay={0.1}>
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={0.15}>
            <div
              className="prose prose-neutral dark:prose-invert mt-10 max-w-none prose-headings:font-heading"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </Reveal>
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
