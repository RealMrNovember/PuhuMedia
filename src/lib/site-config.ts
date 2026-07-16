export const siteConfig = {
  name: "Puhu Media",
  domain: "puhumedia.com.tr",
  tagline: "Sağlık Reklamcılığında Uzman Premium Dijital Ajans",
  description:
    "Hastaneler, tıp merkezleri, estetik klinikleri ve sağlık turizmi markaları için premium dijital pazarlama, SEO, sosyal medya ve marka yönetimi.",
  contact: {
    phone: "+90 212 000 00 00",
    whatsapp: "+90 500 000 00 00",
    email: "info@puhumedia.com.tr",
    address: "İstanbul, Türkiye",
    workingHours: "Pazartesi – Cuma, 09:00 – 18:00",
  },
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
};

export type ServiceNavItem = {
  slug: string;
  label: string;
  shortDescription: string;
};

export const services: ServiceNavItem[] = [
  {
    slug: "saglik-reklamciligi",
    label: "Sağlık Reklamcılığı",
    shortDescription: "Hastane ve klinikler için uçtan uca reklam yönetimi",
  },
  {
    slug: "saglik-turizmi-pazarlamasi",
    label: "Sağlık Turizmi Pazarlaması",
    shortDescription: "Uluslararası hasta kazanımına özel stratejiler",
  },
  {
    slug: "seo",
    label: "SEO",
    shortDescription: "Teknik SEO ve organik büyüme stratejileri",
  },
  {
    slug: "google-ads",
    label: "Google Ads",
    shortDescription: "Yüksek dönüşümlü arama ve display reklamları",
  },
  {
    slug: "meta-reklamlari",
    label: "Meta Reklamları",
    shortDescription: "Instagram ve Facebook'ta hedefli reklam yönetimi",
  },
  {
    slug: "kurumsal-kimlik",
    label: "Kurumsal Kimlik",
    shortDescription: "Marka kimliği ve görsel dil tasarımı",
  },
  {
    slug: "web-tasarim",
    label: "Web Tasarım",
    shortDescription: "Premium, hızlı ve dönüşüm odaklı web siteleri",
  },
  {
    slug: "video-produksiyon",
    label: "Video Prodüksiyon",
    shortDescription: "Kurumsal film ve sosyal medya video içerikleri",
  },
  {
    slug: "fotograf",
    label: "Fotoğraf",
    shortDescription: "Klinik ve doktor markaları için profesyonel çekim",
  },
];

export const mainNav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Vaka Analizleri", href: "/vaka-analizleri" },
  { label: "Blog", href: "/blog" },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];

export const legalNav = [
  { label: "KVKK", href: "/kvkk" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
];
