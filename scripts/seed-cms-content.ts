/**
 * One-shot (or re-runnable) seeder for CmsPage + ServicePage.
 * Force-updates content from source files — use carefully in production.
 *
 *   npm run db:seed-cms
 */
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { services } from "../src/lib/site-config";
import { servicesContent } from "../src/lib/services-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const aboutContent = {
  heroTitle: "Marka taşımıyoruz, marka yaratıyoruz",
  heroBody:
    "Puhu Media, sağlık reklamcılığındaki uzmanlığını kurumsal markalara, sosyal medyadan prodüksiyona uzanan geniş bir yaratıcı hizmet yelpazesiyle birleştiren premium bir ajanstır. Var olan bir markayı yönetmekle yetinmeyiz; her projede markanın kendisini yeniden, daha güçlü şekilde kurgularız.",
  mission:
    "Sağlık kurumlarının ve kurumsal markaların dijital dünyada güvenilir, tutarlı ve premium bir konuma ulaşmasını sağlamak. Her markanın kendine özgü hikayesini, doğru strateji ve yaratıcı üretimle en etkili şekilde anlatmasına aracı olmak.",
  vision:
    "Türkiye'nin sağlık reklamcılığı alanında referans gösterilen, aynı zamanda kurumsal marka yönetimi ve dijital pazarlamada sektörler arası fark yaratan bir yaratıcı ajans olmak.",
  values: [
    {
      title: "Yaratıcılık",
      description:
        "Her marka için sıfırdan düşünülmüş, özgün ve akılda kalıcı fikirler üretiriz.",
    },
    {
      title: "Stratejik Bakış",
      description:
        "Yaratıcılığı ölçülebilir hedeflerle birleştirir, her kararı veriyle destekleriz.",
    },
    {
      title: "Şeffaflık",
      description:
        "Süreç boyunca açık iletişim kurar, sonuçları dürüstçe raporlarız.",
    },
    {
      title: "Sürekli Gelişim",
      description:
        "Sektördeki her yeniliği takip eder, markalarımızı bir adım öne taşırız.",
    },
  ],
};

const legalPages: {
  slug: string;
  title: string;
  seoDescription: string;
  html: string;
}[] = [
  {
    slug: "kvkk",
    title: "KVKK Aydınlatma Metni",
    seoDescription: "Puhu Media KVKK aydınlatma metni.",
    html: `<p>İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla Puhu Media ("Şirket") tarafından işlenen kişisel verileriniz hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.</p>
<h2>1. Veri Sorumlusu</h2>
<p>Kişisel verileriniz, veri sorumlusu sıfatıyla Puhu Media tarafından, aşağıda açıklanan kapsamda işlenebilecektir.</p>
<h2>2. İşlenen Kişisel Veriler</h2>
<p>İletişim formları, teklif talep formları ve site kullanımınız sırasında; ad-soyad, e-posta adresi, telefon numarası, firma bilgisi, mesaj içeriği ve site kullanım verileriniz işlenebilmektedir.</p>
<h2>3. Kişisel Verilerin İşlenme Amacı</h2>
<p>Kişisel verileriniz; talebinizin değerlendirilmesi, tarafınızla iletişime geçilmesi, teklif ve bilgilendirme süreçlerinin yürütülmesi ile yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.</p>
<h2>4. Kişisel Verilerin Aktarılması</h2>
<p>Kişisel verileriniz, yasal zorunluluklar ve hizmet sağlayıcı iş ortaklarımız (e-posta/altyapı hizmet sağlayıcıları gibi) haricinde üçüncü kişilerle paylaşılmamaktadır.</p>
<h2>5. Kişisel Veri Sahibinin Hakları</h2>
<p>KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme, yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini isteme, KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme haklarına sahipsiniz.</p>
<h2>6. İletişim</h2>
<p>Haklarınızı kullanmak için taleplerinizi info@puhumedia.com.tr adresine iletebilirsiniz.</p>`,
  },
  {
    slug: "gizlilik-politikasi",
    title: "Gizlilik Politikası",
    seoDescription: "Puhu Media gizlilik politikası.",
    html: `<p>Puhu Media olarak ziyaretçilerimizin ve müşterilerimizin gizliliğine önem veriyoruz. Bu Gizlilik Politikası, puhumedia.com.tr web sitesini kullanırken toplanan bilgilerin nasıl işlendiğini açıklar.</p>
<h2>1. Topladığımız Bilgiler</h2>
<p>İletişim ve teklif formları aracılığıyla gönderdiğiniz ad-soyad, e-posta, telefon, firma ve mesaj bilgileri ile site kullanımınıza ilişkin çerez tabanlı analitik veriler toplanabilmektedir.</p>
<h2>2. Bilgilerin Kullanım Amacı</h2>
<p>Toplanan bilgiler; talebinizi yanıtlamak, size teklif sunmak, hizmet kalitemizi geliştirmek ve yasal yükümlülüklerimizi yerine getirmek amacıyla kullanılır.</p>
<h2>3. Bilgi Güvenliği</h2>
<p>Verileriniz, yetkisiz erişime karşı makul teknik ve idari önlemlerle korunmaktadır.</p>
<h2>4. Üçüncü Taraflarla Paylaşım</h2>
<p>Bilgileriniz, yasal zorunluluklar ve hizmet sağlayıcı iş ortaklarımız dışında üçüncü taraflarla paylaşılmaz veya satılmaz.</p>
<h2>5. Haklarınız</h2>
<p>KVKK kapsamındaki haklarınız için <a href="/kvkk">KVKK Aydınlatma Metni</a>'ni inceleyebilirsiniz.</p>
<h2>6. İletişim</h2>
<p>Bu politika hakkında sorularınız için info@puhumedia.com.tr adresinden bize ulaşabilirsiniz.</p>`,
  },
  {
    slug: "cerez-politikasi",
    title: "Çerez Politikası",
    seoDescription: "Puhu Media çerez politikası.",
    html: `<p>puhumedia.com.tr, kullanıcı deneyimini geliştirmek ve site performansını analiz etmek amacıyla çerezler (cookies) kullanmaktadır.</p>
<h2>1. Çerez Nedir?</h2>
<p>Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır.</p>
<h2>2. Kullandığımız Çerez Türleri</h2>
<ul>
<li><strong>Zorunlu Çerezler:</strong> Sitenin temel işlevlerinin (tema tercihi gibi) çalışması için gereklidir.</li>
<li><strong>Analitik Çerezler:</strong> Google Analytics gibi araçlarla site kullanımını anlamamıza yardımcı olur.</li>
<li><strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi (örneğin açık/koyu tema) hatırlamak için kullanılır.</li>
</ul>
<h2>3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
<p>Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Ancak bu durumda sitenin bazı özellikleri düzgün çalışmayabilir.</p>
<h2>4. İletişim</h2>
<p>Sorularınız için info@puhumedia.com.tr adresinden bize ulaşabilirsiniz.</p>`,
  },
];

async function main() {
  await prisma.cmsPage.upsert({
    where: { slug: "hakkimizda" },
    create: {
      slug: "hakkimizda",
      title: "Hakkımızda",
      excerpt:
        "Puhu Media; sağlık reklamcılığından kurumsal markalara, marka taşımak yerine marka yaratmayı hedefleyen premium yaratıcı ajanstır.",
      content: aboutContent,
      seoTitle: "Hakkımızda",
      seoDescription:
        "Puhu Media; sağlık reklamcılığından kurumsal markalara, marka taşımak yerine marka yaratmayı hedefleyen premium yaratıcı ajanstır.",
    },
    update: {
      title: "Hakkımızda",
      content: aboutContent,
      seoTitle: "Hakkımızda",
      seoDescription:
        "Puhu Media; sağlık reklamcılığından kurumsal markalara, marka taşımak yerine marka yaratmayı hedefleyen premium yaratıcı ajanstır.",
    },
  });

  for (const page of legalPages) {
    await prisma.cmsPage.upsert({
      where: { slug: page.slug },
      create: {
        slug: page.slug,
        title: page.title,
        content: { html: page.html },
        seoTitle: page.title,
        seoDescription: page.seoDescription,
      },
      update: {
        title: page.title,
        content: { html: page.html },
        seoTitle: page.title,
        seoDescription: page.seoDescription,
      },
    });
  }

  let order = 0;
  for (const service of services) {
    const content = servicesContent[service.slug];
    if (!content) {
      console.warn(`Missing content for service: ${service.slug}`);
      continue;
    }
    await prisma.servicePage.upsert({
      where: { slug: service.slug },
      create: {
        slug: service.slug,
        label: service.label,
        shortDescription: service.shortDescription,
        category: service.category,
        content,
        seoTitle: service.label,
        seoDescription: content.heroDescription,
        isPublished: true,
        order: order++,
      },
      update: {
        label: service.label,
        shortDescription: service.shortDescription,
        category: service.category,
        content,
        seoTitle: service.label,
        seoDescription: content.heroDescription,
        order: order - 1,
      },
    });
  }

  console.log("CMS + service pages seeded.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
