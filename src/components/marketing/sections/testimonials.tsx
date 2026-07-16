import { Star } from "lucide-react";
import { getPublishedTestimonials } from "@/server/repositories/testimonial.repository";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";

export async function Testimonials() {
  const testimonials = await getPublishedTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-brand">
        <SectionHeading
          eyebrow="Müşteri Yorumları"
          title="Bize güvenen markalar ne diyor?"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium text-foreground">
                    {testimonial.name}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    — {testimonial.role}, {testimonial.company}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
