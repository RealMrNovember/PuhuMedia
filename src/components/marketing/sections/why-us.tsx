import { ShieldCheck, LineChart, Users, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/marketing/reveal";

const points = [
  {
    icon: ShieldCheck,
    title: "Sağlık Sektörüne Hakimiyet",
    description:
      "Sağlık reklamcılığına özgü mevzuat, hasta psikolojisi ve marka güveni dinamiklerini bilen uzman bir ekip.",
  },
  {
    icon: LineChart,
    title: "Performans Odaklı Yaklaşım",
    description:
      "Her kampanya ölçülebilir hedeflerle kurgulanır; şeffaf raporlama ile sonuçları birlikte takip ederiz.",
  },
  {
    icon: Users,
    title: "Tek Ekip, Tek Süreç",
    description:
      "Strateji, tasarım, prodüksiyon ve medya yönetimi aynı çatı altında; dağınık tedarikçi yönetimine son.",
  },
  {
    icon: Sparkles,
    title: "Premium Marka Deneyimi",
    description:
      "Her marka için özgün, sade ve güven veren bir görsel dil kurgulayarak sektörde fark yaratıyoruz.",
  },
];

export function WhyUs() {
  return (
    <section className="section-padding bg-secondary/40">
      <div className="container-brand grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Neden Puhu Media"
          title="Sağlık markaları için doğru dijital ortak"
          description="Sağlık reklamcılığında hem yaratıcı hem stratejik olmak zorunlu. Biz bu ikisini aynı anda sunuyoruz."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {points.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.08}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <point.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-heading text-base font-medium text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
