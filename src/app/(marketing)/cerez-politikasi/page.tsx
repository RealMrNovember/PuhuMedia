import type { Metadata } from "next";
import { getContactInfo } from "@/server/repositories/site-setting.repository";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  robots: { index: false, follow: true },
};

export const revalidate = 300;

export default async function CerezPolitikasiPage() {
  const contact = await getContactInfo();

  return (
    <section className="section-padding">
      <div className="container-brand max-w-3xl">
        <h1 className="font-heading text-3xl font-medium text-foreground">
          Çerez Politikası
        </h1>
        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          <p>
            puhumedia.com.tr, kullanıcı deneyimini geliştirmek ve site
            performansını analiz etmek amacıyla çerezler (cookies)
            kullanmaktadır.
          </p>

          <h2>1. Çerez Nedir?</h2>
          <p>
            Çerezler, ziyaret ettiğiniz web siteleri tarafından
            tarayıcınıza kaydedilen küçük metin dosyalarıdır.
          </p>

          <h2>2. Kullandığımız Çerez Türleri</h2>
          <ul>
            <li>
              <strong>Zorunlu Çerezler:</strong> Sitenin temel işlevlerinin
              (tema tercihi gibi) çalışması için gereklidir.
            </li>
            <li>
              <strong>Analitik Çerezler:</strong> Google Analytics gibi
              araçlarla site kullanımını anlamamıza yardımcı olur.
            </li>
            <li>
              <strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi
              (örneğin açık/koyu tema) hatırlamak için kullanılır.
            </li>
          </ul>

          <h2>3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
          <p>
            Tarayıcı ayarlarınızdan çerezleri silebilir veya
            engelleyebilirsiniz. Ancak bu durumda sitenin bazı
            özellikleri düzgün çalışmayabilir.
          </p>

          <h2>4. İletişim</h2>
          <p>
            Sorularınız için{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> adresinden
            bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
