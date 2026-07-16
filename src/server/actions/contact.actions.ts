"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendMail } from "@/lib/email";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getSiteSetting } from "@/server/repositories/site-setting.repository";

const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.email(),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
});

export type ContactFormState = { success?: boolean; error?: string };

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: bots tend to fill every field, humans never see/fill this one.
  if (formData.get("company_website")) {
    return { success: true };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { allowed } = checkRateLimit(`contact:${ip}`, 5, 10 * 60_000);
  if (!allowed) {
    return {
      error: "Çok fazla deneme yaptınız. Lütfen birkaç dakika sonra tekrar deneyin.",
    };
  }

  const parsed = contactSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: "Lütfen tüm zorunlu alanları doğru şekilde doldurun." };
  }

  const { fullName, email, phone, subject, message } = parsed.data;

  await prisma.contactSubmission.create({
    data: {
      fullName,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
      ipAddress: ip,
    },
  });

  const notifyEmail = await getSiteSetting<string>(
    "contact_email",
    "info@puhumedia.com.tr"
  );

  try {
    await sendMail({
      to: notifyEmail,
      subject: `Yeni İletişim Formu: ${subject || fullName}`,
      replyTo: email,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${fullName}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "-"}</p>
        <p><strong>Konu:</strong> ${subject || "-"}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch {
    // Form submission is already persisted in the database even if the
    // notification email fails (e.g. SMTP not yet configured).
  }

  return { success: true };
}
