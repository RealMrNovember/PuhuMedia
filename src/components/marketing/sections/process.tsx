import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";

const steps = [
  {
    number: "01",
    title: "Keşif & Analiz",
    description:
      "Markanızı, hedef kitlenizi ve rakip konumlanmasını detaylıca analiz ederek fırsat alanlarını belirleriz.",
  },
  {
    number: "02",
    title: "Strateji & Planlama",
    description:
      "Hedeflerinize özel kanal stratejisi, içerik takvimi ve performans hedefleri kurgularız.",
  },
  {
    number: "03",
    title: "Üretim & Uygulama",
    description:
      "Görsel kimlik, video, fotoğraf ve reklam materyallerini premium standartlarda üretir, yayına alırız.",
  },
  {
    number: "04",
    title: "Ölçümleme & Optimizasyon",
    description:
      "Şeffaf raporlarla sonuçları paylaşır, verilere dayalı sürekli optimizasyon yaparız.",
  },
];

export function Process() {
  return (
    <section className="section-padding">
      <div className="container-brand">
        <SectionHeading
          eyebrow="Çalışma Şeklimiz"
          title="Şeffaf ve öngörülebilir bir iş akışı"
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.1}>
              <div className="relative">
                <span className="font-heading text-5xl font-medium text-primary/25">
                  {step.number}
                </span>
                <h3 className="mt-4 font-heading text-lg font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
