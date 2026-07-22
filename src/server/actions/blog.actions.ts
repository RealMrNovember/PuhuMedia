"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CONTENT_ROLES } from "@/lib/admin/permissions";
import { requireRole } from "@/lib/admin/require-session";
import { slugify } from "@/lib/admin/slugify";
import { saveUploadedFile } from "@/lib/upload";
import { prisma } from "@/lib/db";

export type BlogFormState = { error?: string; success?: boolean; id?: string };

const schema = z.object({
  title: z.string().trim().min(2).max(200),
  slug: z.string().trim().max(220).optional().or(z.literal("")),
  excerpt: z.string().trim().min(2).max(500),
  contentHtml: z.string().trim().min(2),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED"]),
  seoTitle: z.string().trim().max(200).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(300).optional().or(z.literal("")),
});

function revalidateBlog(slug?: string) {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/", "layout");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createBlogPostAction(
  _prev: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const session = await requireRole(CONTENT_ROLES);
  const parsed = schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    contentHtml: formData.get("contentHtml"),
    status: formData.get("status") || "DRAFT",
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const slug = parsed.data.slug || slugify(parsed.data.title);
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) return { error: "Bu slug zaten kullanılıyor." };

  let coverImage: string | null = null;
  const file = formData.get("coverImage");
  if (file instanceof File && file.size > 0) {
    try {
      coverImage = await saveUploadedFile(file, "blog");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Kapak görseli yüklenemedi." };
    }
  }

  const post = await prisma.blogPost.create({
    data: {
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt,
      contentHtml: parsed.data.contentHtml,
      coverImage,
      status: parsed.data.status,
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
      authorId: session.user.id,
    },
  });

  revalidateBlog(slug);
  return { success: true, id: post.id };
}

export async function updateBlogPostAction(
  id: string,
  _prev: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  await requireRole(CONTENT_ROLES);
  const parsed = schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    contentHtml: formData.get("contentHtml"),
    status: formData.get("status") || "DRAFT",
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const current = await prisma.blogPost.findUniqueOrThrow({ where: { id } });
  const slug = parsed.data.slug || slugify(parsed.data.title);
  if (slug !== current.slug) {
    const clash = await prisma.blogPost.findUnique({ where: { slug } });
    if (clash) return { error: "Bu slug zaten kullanılıyor." };
  }

  let coverImage = current.coverImage;
  const file = formData.get("coverImage");
  if (file instanceof File && file.size > 0) {
    try {
      coverImage = await saveUploadedFile(file, "blog");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Kapak görseli yüklenemedi." };
    }
  }

  await prisma.blogPost.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt,
      contentHtml: parsed.data.contentHtml,
      coverImage,
      status: parsed.data.status,
      publishedAt:
        parsed.data.status === "PUBLISHED"
          ? current.publishedAt ?? new Date()
          : current.publishedAt,
      seoTitle: parsed.data.seoTitle || null,
      seoDescription: parsed.data.seoDescription || null,
    },
  });

  revalidateBlog(slug);
  return { success: true, id };
}

export async function deleteBlogPostAction(id: string) {
  await requireRole(["SUPERADMIN", "ADMIN", "EDITOR"]);
  const post = await prisma.blogPost.delete({ where: { id } });
  revalidateBlog(post.slug);
}

export async function toggleBlogStatusAction(id: string) {
  await requireRole(CONTENT_ROLES);
  const post = await prisma.blogPost.findUniqueOrThrow({ where: { id } });
  const next = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
  await prisma.blogPost.update({
    where: { id },
    data: {
      status: next,
      publishedAt: next === "PUBLISHED" ? post.publishedAt ?? new Date() : post.publishedAt,
    },
  });
  revalidateBlog(post.slug);
}
