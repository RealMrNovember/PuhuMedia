import { getActiveInstagramPosts } from "@/server/repositories/instagram-post.repository";
import { getSiteSetting } from "@/server/repositories/site-setting.repository";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";
import { InstagramFeed } from "@/components/marketing/instagram-feed";
import { InstagramIcon } from "@/components/marketing/social-icons";
import { Button } from "@/components/ui/button";

export async function InstagramShowcase() {
  const [posts, handle] = await Promise.all([
    getActiveInstagramPosts(6),
    getSiteSetting<string>("instagram_handle", ""),
  ]);

  if (!handle && posts.length === 0) return null;

  const profileUrl = handle ? `https://instagram.com/${handle}` : undefined;

  return (
    <section className="section-padding">
      <div className="container-brand">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Instagram"
            title={handle ? `@${handle}` : "Instagram'dan Son Paylaşımlar"}
          />
          {profileUrl ? (
            <Button asChild variant="outline" className="rounded-full">
              <a href={profileUrl} target="_blank" rel="noreferrer">
                <InstagramIcon className="size-4" />
                Takip Et
              </a>
            </Button>
          ) : null}
        </div>

        {posts.length > 0 ? (
          <Reveal delay={0.1} className="mt-10">
            <InstagramFeed postUrls={posts.map((post) => post.url)} />
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              Instagram gönderilerimizi yakında burada da paylaşacağız —
              bu arada bizi Instagram&apos;da takip edebilirsiniz.
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
