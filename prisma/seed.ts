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

  const defaultSettings: Record<string, unknown> = {
    contact_phone: "+90 212 000 00 00",
    contact_whatsapp: "+90 500 000 00 00",
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
      update: {},
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
  ];

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: `seed-faq-${faq.order}` },
      update: {},
      create: { id: `seed-faq-${faq.order}`, ...faq },
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
