import type { Metadata } from "next";
import Link from "next/link";
import {
  GalleryHorizontal,
  FileText,
  HelpCircle,
  Building2,
  Briefcase,
  MessageSquareQuote,
  Layers,
  FileStack,
  Inbox,
  Mail,
  Image as ImageIcon,
  Settings,
  Users,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/page-header";
import { canManageUsers } from "@/lib/admin/permissions";
import { InstagramIcon } from "@/components/marketing/social-icons";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

const modules = [
  { href: "/admin/hero-slider", label: "Hero Slider", description: "Ana sayfa slider yönetimi", icon: GalleryHorizontal },
  { href: "/admin/blog", label: "Blog", description: "Yazı oluştur ve yayınla", icon: FileText },
  { href: "/admin/sss", label: "SSS", description: "Sık sorulan sorular", icon: HelpCircle },
  { href: "/admin/referanslar", label: "Referanslar", description: "Marka referansları", icon: Building2 },
  { href: "/admin/case-studies", label: "Case Studies", description: "Başarı hikayeleri", icon: Briefcase },
  { href: "/admin/yorumlar", label: "Yorumlar", description: "Müşteri yorumları", icon: MessageSquareQuote },
  { href: "/admin/instagram", label: "Instagram", description: "Gönderi vitrini", icon: InstagramIcon },
  { href: "/admin/hizmetler", label: "Hizmetler", description: "Hizmet sayfası içerikleri", icon: Layers },
  { href: "/admin/sayfalar", label: "Sayfalar", description: "CMS sayfaları", icon: FileStack },
  { href: "/admin/teklifler", label: "Teklifler", description: "Gelen teklif formları", icon: Inbox },
  { href: "/admin/iletisim-mesajlari", label: "İletişim", description: "İletişim mesajları", icon: Mail },
  { href: "/admin/medya", label: "Medya", description: "Dosya kütüphanesi", icon: ImageIcon },
  { href: "/admin/ayarlar", label: "Ayarlar", description: "Site ayarları", icon: Settings },
  { href: "/admin/kullanicilar", label: "Kullanıcılar", description: "Yönetici hesapları", icon: Users, superadminOnly: true },
];

export default async function AdminDashboardPage() {
  const session = await auth();
  const role = session?.user?.role ?? "";

  const [
    heroSlides,
    blogPosts,
    faqs,
    references,
    caseStudies,
    testimonials,
    leadsNew,
    contactsUnread,
    media,
    services,
    pages,
    users,
  ] = await Promise.all([
    prisma.heroSlide.count({ where: { isActive: true } }),
    prisma.blogPost.count(),
    prisma.fAQ.count(),
    prisma.reference.count(),
    prisma.caseStudy.count(),
    prisma.testimonial.count(),
    prisma.leadSubmission.count({ where: { status: "NEW" } }),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.mediaAsset.count(),
    prisma.servicePage.count(),
    prisma.cmsPage.count(),
    prisma.user.count({ where: { isActive: true } }),
  ]);

  const stats = [
    { label: "Aktif hero", value: heroSlides },
    { label: "Blog yazısı", value: blogPosts },
    { label: "Yeni teklif", value: leadsNew },
    { label: "Okunmamış mesaj", value: contactsUnread },
    { label: "SSS", value: faqs },
    { label: "Referans", value: references },
    { label: "Case study", value: caseStudies },
    { label: "Yorum", value: testimonials },
    { label: "Hizmet", value: services },
    { label: "CMS sayfa", value: pages },
    { label: "Medya", value: media },
    ...(canManageUsers(role) ? [{ label: "Aktif kullanıcı", value: users }] : []),
  ];

  const visibleModules = modules.filter(
    (m) => !("superadminOnly" in m && m.superadminOnly) || canManageUsers(role)
  );

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Yönetim Paneli"
        description={`Hoş geldiniz, ${session?.user?.name ?? ""} (${session?.user?.role ?? ""})`}
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card px-4 py-4"
          >
            <p className="font-heading text-2xl font-medium text-foreground">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {visibleModules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <module.icon className="size-5" />
            </div>
            <div>
              <h2 className="font-heading text-base font-medium text-foreground">
                {module.label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{module.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
