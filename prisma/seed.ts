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
