import { Hero } from "@/components/marketing/sections/hero";
import { ReferenceStrip } from "@/components/marketing/sections/reference-strip";
import { ServicesGrid } from "@/components/marketing/sections/services-grid";
import { WhyUs } from "@/components/marketing/sections/why-us";
import { Process } from "@/components/marketing/sections/process";
import { CaseStudiesTeaser } from "@/components/marketing/sections/case-studies-teaser";
import { Testimonials } from "@/components/marketing/sections/testimonials";
import { BlogTeaser } from "@/components/marketing/sections/blog-teaser";
import { FaqTeaser } from "@/components/marketing/sections/faq-teaser";
import { CtaBanner } from "@/components/marketing/sections/cta-banner";

export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <Hero />
      <ReferenceStrip />
      <ServicesGrid />
      <WhyUs />
      <Process />
      <CaseStudiesTeaser />
      <Testimonials />
      <BlogTeaser />
      <FaqTeaser />
      <CtaBanner />
    </>
  );
}
