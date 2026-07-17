<div align="center">

# Puhu Media

**"Marka taşımıyoruz, marka yaratıyoruz."**
Sağlık reklamcılığında uzman, premium yaratıcı ajans platformu

[puhumedia.com.tr](https://puhumedia.com.tr)

</div>

---

## Hakkında

Puhu Media'nın kurumsal web platformu; sağlık reklamcılığı ve sağlık turizmi pazarlamasındaki uzmanlığın yanı sıra dijital pazarlama, marka & kimlik, prodüksiyon alanlarında **18 hizmeti** kapsayan, tamamen özel geliştirilmiş bir kurumsal site ve içerik yönetim sistemidir.

Site; pazarlama sayfaları, blog, referans sistemi, Instagram vitrini, iletişim/teklif formları ve kod değiştirmeden içerik yönetimine izin veren bir admin panelinden oluşur.

## Hizmetler

| Sağlık Reklamcılığı | Dijital Pazarlama | Marka & Kimlik | Prodüksiyon & Görsel |
| --- | --- | --- | --- |
| Sağlık Reklamcılığı | Dijital Pazarlama Yönetimi | Marka Yönetimi | Görsel İşitsel Prodüksiyon |
| Sağlık Turizmi Pazarlaması | SEO Yönetimi ve Danışmanlık | Kurumsal Kimlik Tasarımı | Ürün Fotoğrafçılığı |
| | Google Ads | Grafik Tasarım | Özel Gün Çekimleri |
| | Meta Reklamları | Web Tasarım & Yazılım | Kurumsal Fotoğraf Çekimi |
| | Sosyal Medya Yönetimi | İçerik Üretimi | |
| | Influencer Marketing | | |
| | Yapay Zeka Destekli Pazarlama | | |

## Site Haritası

Ana Sayfa · Hakkımızda · Hizmetler (18 sayfa) · Referanslar · Blog · SSS · İletişim · Teklif Al · KVKK · Çerez Politikası · Gizlilik Politikası

## Teknoloji Yığını

| Katman | Teknoloji |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack, React 19) |
| Dil | TypeScript (strict mode) |
| Stil | Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com), açık/koyu tema |
| Animasyon | [Motion](https://motion.dev) (Framer Motion) |
| Veritabanı | PostgreSQL |
| ORM | [Prisma 7](https://www.prisma.io) (driver adapters, `prisma-client` generator) |
| Kimlik Doğrulama | [Auth.js v5](https://authjs.dev) (Credentials + JWT, rol tabanlı yetkilendirme) |
| Doğrulama | Zod |
| E-posta | Nodemailer (SMTP) |
| Görsel İşleme | sharp |

## Öne Çıkan Özellikler

- **Açık/koyu tema** — bağımsız (harici kütüphanesiz) tema sağlayıcı, sistem tercihine duyarlı
- **Admin panelinden seçilebilir menü stili** — üst menü / mobil alt menü çubuğu / masaüstü yan menü
- **Instagram vitrini** — admin panelinden gönderi linki ekleyerek resmi Instagram embed ile gösterim
- **Site ayarları paneli** — iletişim bilgileri, sosyal medya, Google Maps, menü stili, analitik; tamamı veritabanından yönetiliyor
- **Çalışan form altyapısı** — İletişim ve Teklif Al formları: DB kaydı, e-posta bildirimi, dosya yükleme, honeypot + rate-limit spam koruması
- **18 hizmet sayfası** — her biri kendi SSS, özellik ve ilgili hizmetler bölümüyle

## Mimari

Proje, sorumlulukları katmanlara ayıran hafif bir Clean Architecture yaklaşımı izler:

```
src/
  app/
    (marketing)/     → herkese açık pazarlama sitesi (route group)
    admin/            → yönetim paneli (giriş korumalı)
    api/               → route handler'lar (Auth.js vb.)
  components/
    ui/                → shadcn/ui bileşenleri
    marketing/         → pazarlama sitesine özel bileşenler
  lib/                 → db, auth, email, site-config, güvenlik yardımcıları
  server/
    repositories/      → Prisma veri erişim katmanı
    actions/           → server action'lar (form/CRUD giriş noktaları)
  proxy.ts             → admin rotalarını koruyan Next.js Proxy (eski adıyla Middleware)
prisma/
  schema.prisma        → veri modeli
  seed.ts               → başlangıç admin kullanıcısı ve varsayılan içerik
```

## Geliştirme Ortamını Kurma

### Gereksinimler

- Node.js 20.9+
- PostgreSQL (local geliştirme için Docker önerilir)

### Adımlar

```bash
# 1. Bağımlılıkları kur
npm install

# 2. Ortam değişkenlerini ayarla
cp .env.example .env
# .env içindeki DATABASE_URL, AUTH_SECRET, SMTP_* değerlerini doldurun

# 3. Local PostgreSQL'i başlat (Docker)
docker run -d --name puhumedia-postgres \
  -e POSTGRES_USER=puhumedia \
  -e POSTGRES_PASSWORD=puhumedia_dev_local \
  -e POSTGRES_DB=puhumedia \
  -p 5432:5432 postgres:17-alpine

# 4. Veritabanı şemasını uygula ve başlangıç verisini yükle
npx prisma migrate dev
npx prisma db seed

# 5. Geliştirme sunucusunu başlat
npm run dev
```

Site [http://localhost:3000](http://localhost:3000) adresinde, admin paneli [http://localhost:3000/admin](http://localhost:3000/admin) adresinde çalışır. Admin giriş bilgileri ayrıca proje sahibiyle paylaşılmıştır (bu dosyada tutulmaz).

### Faydalı Komutlar

```bash
npm run dev          # geliştirme sunucusu (Turbopack)
npm run build         # production build (standalone çıktı)
npm run start          # production sunucusu
npm run lint            # ESLint
npx tsc --noEmit         # tip kontrolü
npx prisma studio         # veritabanını görsel arayüzden incele
npx prisma migrate dev     # yeni migration oluştur/uygula
```

## Dağıtım (Deployment)

Uygulama local ortamda build alınır, Next.js standalone çıktısı üretim sunucusuna aktarılır. `scripts/deploy.sh` bu süreci otomatikleştirir: build → paketleme → SSH ile aktarım → migration → PM2 restart → sağlık kontrolü → otomatik rollback.

Üretim sunucusundaki yapı (yalnızca bu projeye ait, sunucudaki diğer sitelerden tamamen izole):

- **Node.js** — siteye özel, izole çalışma zamanı (`.node/`), sistem Node'undan bağımsız
- **PM2** — siteye özel `PM2_HOME`, sunucudaki diğer PM2 örnekleriyle çakışmaz
- **PostgreSQL** — izole Docker container, kendine özel port
- **Nginx** — bu domain'e özel reverse-proxy vhost konfigürasyonu, Let's Encrypt SSL sertifikası

```bash
./scripts/deploy.sh
```

## Lisans

Bu proje Puhu Media için özel olarak geliştirilmiştir. Tüm hakları saklıdır.

---

<div align="center">
<sub>Tasarım & geliştirme: <a href="https://cicibyte.com">Cicibyte Corp</a></sub>
</div>
