export type NavStyle = "topbar" | "bottombar" | "sidebar";

export const siteConfig = {
  name: "Puhu Media",
  domain: "puhumedia.com.tr",
  tagline: "Sağlık Reklamcılığında Uzman Premium Yaratıcı Ajans",
  description:
    "Puhu Media; sağlık reklamcılığından kurumsal markalara, sosyal medyadan prodüksiyona kadar geniş bir yelpazede premium dijital pazarlama ve yaratıcı çözümler sunan ajanstır.",
  contact: {
    phone: "+90 542 490 65 28",
    phoneRaw: "+905424906528",
    whatsapp: "+905424906528",
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

export type ServiceCategoryKey =
  | "saglik"
  | "dijital-pazarlama"
  | "marka-web"
  | "produksiyon";

export const serviceCategories: { key: ServiceCategoryKey; label: string }[] = [
  { key: "saglik", label: "Sağlık Reklamcılığı" },
  { key: "dijital-pazarlama", label: "Dijital Pazarlama" },
  { key: "marka-web", label: "Marka & Web" },
  { key: "produksiyon", label: "Prodüksiyon & Görsel" },
];

export type ServiceNavItem = {
  slug: string;
  label: string;
  shortDescription: string;
  category: ServiceCategoryKey;
};

export const services: ServiceNavItem[] = [
  {
    slug: "saglik-reklamciligi",
    label: "Sağlık Reklamcılığı",
    shortDescription: "Hastane ve klinikler için uçtan uca reklam yönetimi",
    category: "saglik",
  },
  {
    slug: "saglik-turizmi-pazarlamasi",
    label: "Sağlık Turizmi Pazarlaması",
    shortDescription: "Uluslararası hasta kazanımına özel çok dilli stratejiler",
    category: "saglik",
  },
  {
    slug: "seo",
    label: "SEO",
    shortDescription: "Teknik SEO ve organik büyüme stratejileri",
    category: "dijital-pazarlama",
  },
  {
    slug: "google-ads",
    label: "Google Ads",
    shortDescription: "Yüksek dönüşümlü arama ve display reklamları",
    category: "dijital-pazarlama",
  },
  {
    slug: "meta-reklamlari",
    label: "Meta Reklamları",
    shortDescription: "Instagram ve Facebook'ta hedefli reklam yönetimi",
    category: "dijital-pazarlama",
  },
  {
    slug: "sosyal-medya-yonetimi",
    label: "Sosyal Medya Yönetimi",
    shortDescription: "Organik içerik, topluluk yönetimi ve marka sesi",
    category: "dijital-pazarlama",
  },
  {
    slug: "yapay-zeka-destekli-pazarlama",
    label: "Yapay Zeka Destekli Pazarlama",
    shortDescription: "AI destekli içerik, otomasyon ve performans optimizasyonu",
    category: "dijital-pazarlama",
  },
  {
    slug: "kurumsal-kimlik",
    label: "Kurumsal Kimlik",
    shortDescription: "Marka kimliği ve görsel dil tasarımı",
    category: "marka-web",
  },
  {
    slug: "web-tasarim",
    label: "Web Tasarım & Yazılım",
    shortDescription: "Premium, hızlı ve dönüşüm odaklı web siteleri",
    category: "marka-web",
  },
  {
    slug: "icerik-uretimi",
    label: "İçerik Üretimi",
    shortDescription: "Metin, görsel ve video içerik stratejisi",
    category: "marka-web",
  },
  {
    slug: "video-produksiyon",
    label: "Video Prodüksiyon",
    shortDescription: "Reklam filmi, kurumsal film ve sosyal medya videoları",
    category: "produksiyon",
  },
  {
    slug: "urun-fotografciligi",
    label: "Ürün Fotoğrafçılığı",
    shortDescription: "E-ticaret ve katalog için profesyonel ürün çekimi",
    category: "produksiyon",
  },
  {
    slug: "ozel-gun-cekimleri",
    label: "Özel Gün Çekimleri",
    shortDescription: "Düğün, nişan ve özel organizasyonlar için çekim",
    category: "produksiyon",
  },
  {
    slug: "kurumsal-fotograf",
    label: "Kurumsal Fotoğraf Çekimi",
    shortDescription: "Doktor, klinik ve marka portre/mekan çekimi",
    category: "produksiyon",
  },
];

export const mainNav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Blog", href: "/blog" },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];

export const legalNav = [
  { label: "KVKK", href: "/kvkk" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
];
