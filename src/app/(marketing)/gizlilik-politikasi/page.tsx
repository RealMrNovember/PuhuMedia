import type { Metadata } from "next";
import { getContactInfo } from "@/server/repositories/site-setting.repository";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  robots: { index: false, follow: true },
};

export const revalidate = 300;

export default async function GizlilikPolitikasiPage() {
  const contact = await getContactInfo();

  return (
    <section className="section-padding">
      <div className="container-brand max-w-3xl">
        <h1 className="font-heading text-3xl font-medium text-foreground">
          Gizlilik Politikası
        </h1>
        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          <p>
            Puhu Media olarak ziyaretçilerimizin ve müşterilerimizin
            gizliliğine önem veriyoruz. Bu Gizlilik Politikası,
            puhumedia.com.tr web sitesini kullanırken toplanan bilgilerin
            nasıl işlendiğini açıklar.
          </p>

          <h2>1. Topladığımız Bilgiler</h2>
          <p>
            İletişim ve teklif formları aracılığıyla gönderdiğiniz ad-soyad,
            e-posta, telefon, firma ve mesaj bilgileri ile site kullanımınıza
            ilişkin çerez tabanlı analitik veriler toplanabilmektedir.
          </p>

          <h2>2. Bilgilerin Kullanım Amacı</h2>
          <p>
            Toplanan bilgiler; talebinizi yanıtlamak, size teklif sunmak,
            hizmet kalitemizi geliştirmek ve yasal yükümlülüklerimizi yerine
            getirmek amacıyla kullanılır.
          </p>

          <h2>3. Bilgi Güvenliği</h2>
          <p>
            Verileriniz, yetkisiz erişime karşı makul teknik ve idari
            önlemlerle korunmaktadır.
          </p>

          <h2>4. Üçüncü Taraflarla Paylaşım</h2>
          <p>
            Bilgileriniz, yasal zorunluluklar ve hizmet sağlayıcı iş
            ortaklarımız dışında üçüncü taraflarla paylaşılmaz veya
            satılmaz.
          </p>

          <h2>5. Haklarınız</h2>
          <p>
            KVKK kapsamındaki haklarınız için{" "}
            <a href="/kvkk">KVKK Aydınlatma Metni</a>&apos;ni
            inceleyebilirsiniz.
          </p>

          <h2>6. İletişim</h2>
          <p>
            Bu politika hakkında sorularınız için{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> adresinden
            bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
