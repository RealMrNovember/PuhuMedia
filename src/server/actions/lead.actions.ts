"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendMail } from "@/lib/email";
import { saveUploadedFile } from "@/lib/upload";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getSiteSetting } from "@/server/repositories/site-setting.repository";

const leadSchema = z.object({
  company: z.string().trim().max(160).optional().or(z.literal("")),
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(30),
  email: z.email(),
  service: z.string().trim().min(1),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type LeadFormState = { success?: boolean; error?: string };

export async function submitLeadAction(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  if (formData.get("company_website")) {
    return { success: true };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const userAgent = headerList.get("user-agent") ?? undefined;

  const { allowed } = checkRateLimit(`lead:${ip}`, 5, 10 * 60_000);
  if (!allowed) {
    return {
      error: "Çok fazla deneme yaptınız. Lütfen birkaç dakika sonra tekrar deneyin.",
    };
  }

  const parsed = leadSchema.safeParse({
    company: formData.get("company"),
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    service: formData.get("service"),
    budget: formData.get("budget"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: "Lütfen tüm zorunlu alanları doğru şekilde doldurun." };
  }

  const { company, fullName, phone, email, service, budget, message } =
    parsed.data;

  let fileUrl: string | null = null;
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    try {
      fileUrl = await saveUploadedFile(file, "leads");
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Dosya yüklenemedi.",
      };
    }
  }

  await prisma.leadSubmission.create({
    data: {
      company: company || null,
      fullName,
      phone,
      email,
      service,
      budget: budget || null,
      message: message || null,
      fileUrl,
      source: "teklif-al",
      ipAddress: ip,
      userAgent,
    },
  });

  const notifyEmail = await getSiteSetting<string>(
    "contact_email",
    "info@puhumedia.com.tr"
  );

  try {
    await sendMail({
      to: notifyEmail,
      subject: `Yeni Teklif Talebi: ${fullName}`,
      replyTo: email,
      html: `
        <h2>Yeni Teklif Talebi</h2>
        <p><strong>Firma:</strong> ${company || "-"}</p>
        <p><strong>Ad Soyad:</strong> ${fullName}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Hizmet:</strong> ${service}</p>
        <p><strong>Bütçe:</strong> ${budget || "-"}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${(message || "-").replace(/\n/g, "<br/>")}</p>
        ${fileUrl ? `<p><strong>Dosya:</strong> ${fileUrl}</p>` : ""}
      `,
    });
  } catch {
    // Lead is already saved to the database even if the email fails.
  }

  return { success: true };
}
