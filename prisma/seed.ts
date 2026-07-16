import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@puhumedia.com.tr";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe!2026";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Puhu Media Yönetici",
      email: adminEmail,
      passwordHash,
      role: "SUPERADMIN",
    },
  });

  // NOTE: `update` currently overwrites existing values on every reseed
  // (pre-launch convenience). Switch to `update: {}` (create-only) once the
  // admin panel holds real production settings, so a reseed can never
  // clobber live admin edits.
  const defaultSettings: Record<string, unknown> = {
    contact_phone: "+90 542 490 65 28",
    contact_whatsapp: "+905424906528",
    contact_email: "info@puhumedia.com.tr",
    contact_address: "İstanbul, Türkiye",
    working_hours: "Pazartesi - Cuma, 09:00 - 18:00",
    social_instagram: "",
    social_linkedin: "",
    social_youtube: "",
    theme_primary_color: "#0F172A",
    theme_accent_color: "#C9A227",
    ga_id: "",
    gtm_id: "",
  };

  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: value as never },
      create: { key, value: value as never },
    });
  }

  const faqs = [
    {
      question: "Sadece sağlık sektörüne mi hizmet veriyorsunuz?",
      answer:
        "Sağlık reklamcılığı ve sağlık turizmi pazarlaması en güçlü uzmanlık alanımız olsa da; kurumsal marka yönetimi, sosyal medya, dijital reklam, SEO ve web yazılım gibi hizmetleri farklı sektörlerden markalara da sunuyoruz.",
      order: 1,
    },
    {
      question: "Sağlık reklamcılığında mevzuata uygunluk nasıl sağlanıyor?",
      answer:
        "Sağlık Bakanlığı reklam yönetmeliği ve platformların (Google, Meta) sağlık içerikli reklam politikalarına hakim bir ekiple çalışıyoruz; her kampanya öncesinde içerik ve teklif metinlerini uyumluluk açısından gözden geçiriyoruz.",
      order: 2,
    },
    {
      question: "Bir projeye başlamadan önce süreç nasıl işliyor?",
      answer:
        "Keşif görüşmesiyle marka, hedef kitle ve rakip analizini yapıyor; ardından hedeflerinize özel bir strateji ve teklif sunuyoruz. Onay sonrası üretim ve yayın süreci başlıyor.",
      order: 3,
    },
    {
      question: "Hangi raporlama ve ölçümleme araçlarını kullanıyorsunuz?",
      answer:
        "Google Analytics, Google Search Console, Meta Ads Manager ve Google Ads gibi araçlarla düzenli performans raporları sunuyor; kampanya sonuçlarını şeffaf şekilde paylaşıyoruz.",
      order: 4,
    },
    {
      question: "Sağlık turizmi pazarlamasında hangi dillerde hizmet veriyorsunuz?",
      answer:
        "Uluslararası hasta kazanımı hedefleyen markalar için İngilizce, Arapça ve Rusça başta olmak üzere hedef pazara özel çok dilli içerik ve reklam yönetimi sağlıyoruz.",
      order: 5,
    },
    {
      question: "Minimum çalışma süresi veya sözleşme taahhüdü var mı?",
      answer:
        "Hizmet kapsamına göre değişmekle birlikte sürdürülebilir sonuçlar için genellikle aylık anlaşmalar öneriyoruz; proje bazlı çalışmalar için de esnek modeller sunuyoruz.",
      order: 6,
    },
    {
      question:
        "Sadece kurumsal projeler mi alıyorsunuz, yoksa ürün ve özel gün çekimleri de yapıyor musunuz?",
      answer:
        "Kurumsal reklam ve prodüksiyon işlerinin yanı sıra e-ticaret/katalog için ürün fotoğrafçılığı ile düğün, nişan ve özel organizasyonlar için fotoğraf-video çekimi hizmeti de sunuyoruz.",
      order: 7,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: `seed-faq-${faq.order}` },
      update: {},
      create: { id: `seed-faq-${faq.order}`, ...faq },
    });
  }

  const references = [
    {
      slug: "vitalis-klinik",
      name: "Vitalis Klinik",
      logo: "/references/vitalis-klinik.svg",
      sector: "Diş Kliniği",
      description:
        "İstanbul merkezli diş kliniği zinciri için marka yönetimi ve dijital pazarlama iş birliği. (Örnek/yer tutucu içerik)",
      servicesUsed: ["saglik-reklamciligi", "seo", "kurumsal-fotograf"],
      order: 1,
      isFeatured: true,
    },
    {
      slug: "nova-saglik-grubu",
      name: "Nova Sağlık Grubu",
      logo: "/references/nova-saglik-grubu.svg",
      sector: "Hastane / Sağlık Turizmi",
      description:
        "Uluslararası hasta kazanımına yönelik çok dilli dijital pazarlama iş birliği. (Örnek/yer tutucu içerik)",
      servicesUsed: ["saglik-turizmi-pazarlamasi", "google-ads"],
      order: 2,
      isFeatured: true,
    },
    {
      slug: "lumen-dis-klinigi",
      name: "Lumen Diş Kliniği",
      logo: "/references/lumen-dis-klinigi.svg",
      sector: "Diş Kliniği",
      description:
        "Sosyal medya yönetimi ve içerik üretimi ile marka bilinirliği artırma çalışması. (Örnek/yer tutucu içerik)",
      servicesUsed: ["sosyal-medya-yonetimi", "icerik-uretimi"],
      order: 3,
      isFeatured: false,
    },
    {
      slug: "aurora-guzellik-merkezi",
      name: "Aurora Güzellik Merkezi",
      logo: "/references/aurora-guzellik-merkezi.svg",
      sector: "Estetik Merkezi",
      description:
        "Kurumsal kimlik yenileme ve web sitesi tasarımı projesi. (Örnek/yer tutucu içerik)",
      servicesUsed: ["kurumsal-kimlik", "web-tasarim"],
      order: 4,
      isFeatured: true,
    },
    {
      slug: "kristal-otel-turizm",
      name: "Kristal Otel & Turizm",
      logo: "/references/kristal-otel-turizm.svg",
      sector: "Turizm",
      description:
        "Otel markası için video prodüksiyon ve sosyal medya reklam yönetimi. (Örnek/yer tutucu içerik)",
      servicesUsed: ["video-produksiyon", "meta-reklamlari"],
      order: 5,
      isFeatured: false,
    },
    {
      slug: "mavi-teknoloji",
      name: "Mavi Teknoloji A.Ş.",
      logo: "/references/mavi-teknoloji.svg",
      sector: "Kurumsal / Teknoloji",
      description:
        "Kurumsal web sitesi ve SEO stratejisi geliştirme projesi. (Örnek/yer tutucu içerik)",
      servicesUsed: ["web-tasarim", "seo"],
      order: 6,
      isFeatured: false,
    },
  ];

  for (const reference of references) {
    await prisma.reference.upsert({
      where: { slug: reference.slug },
      update: {},
      create: { ...reference, gallery: [], isPublished: true },
    });
  }

  console.log(`Seed complete. Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
