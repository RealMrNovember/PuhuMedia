import type { Metadata } from "next";
import { getContactInfo } from "@/server/repositories/site-setting.repository";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  robots: { index: false, follow: true },
};

export const revalidate = 300;

export default async function KvkkPage() {
  const contact = await getContactInfo();

  return (
    <section className="section-padding">
      <div className="container-brand max-w-3xl">
        <h1 className="font-heading text-3xl font-medium text-foreground">
          KVKK Aydınlatma Metni
        </h1>
        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          <p>
            İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması
            Kanunu (&quot;KVKK&quot;) uyarınca, veri sorumlusu sıfatıyla Puhu
            Media (&quot;Şirket&quot;) tarafından işlenen kişisel verileriniz
            hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
          </p>

          <h2>1. Veri Sorumlusu</h2>
          <p>
            Kişisel verileriniz, veri sorumlusu sıfatıyla Puhu Media
            tarafından, aşağıda açıklanan kapsamda işlenebilecektir.
          </p>

          <h2>2. İşlenen Kişisel Veriler</h2>
          <p>
            İletişim formları, teklif talep formları ve site kullanımınız
            sırasında; ad-soyad, e-posta adresi, telefon numarası, firma
            bilgisi, mesaj içeriği ve site kullanım verileriniz
            işlenebilmektedir.
          </p>

          <h2>3. Kişisel Verilerin İşlenme Amacı</h2>
          <p>
            Kişisel verileriniz; talebinizin değerlendirilmesi, tarafınızla
            iletişime geçilmesi, teklif ve bilgilendirme süreçlerinin
            yürütülmesi ile yasal yükümlülüklerin yerine getirilmesi
            amaçlarıyla işlenmektedir.
          </p>

          <h2>4. Kişisel Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz, yasal zorunluluklar ve hizmet sağlayıcı
            iş ortaklarımız (e-posta/altyapı hizmet sağlayıcıları gibi)
            haricinde üçüncü kişilerle paylaşılmamaktadır.
          </p>

          <h2>5. Kişisel Veri Sahibinin Hakları</h2>
          <p>
            KVKK&apos;nın 11. maddesi uyarınca; kişisel verilerinizin işlenip
            işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme,
            işlenme amacını öğrenme, yurt içinde/yurt dışında aktarıldığı
            üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini
            isteme, KVKK&apos;da öngörülen şartlar çerçevesinde silinmesini
            veya yok edilmesini isteme haklarına sahipsiniz.
          </p>

          <h2>6. İletişim</h2>
          <p>
            Haklarınızı kullanmak için taleplerinizi{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> adresine
            iletebilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
