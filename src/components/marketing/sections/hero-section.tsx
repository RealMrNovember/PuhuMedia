import { getActiveHeroSlides } from "@/server/repositories/hero-slide.repository";
import { HeroSlider } from "./hero-slider";
import { Hero } from "./hero";

export async function HeroSection() {
  const slides = await getActiveHeroSlides();

  if (slides.length === 0) {
    return <Hero />;
  }

  return <HeroSlider slides={slides} />;
}
