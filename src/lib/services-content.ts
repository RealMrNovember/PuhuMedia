export type ServicePageContent = {
  heroTagline: string;
  heroDescription: string;
  highlights: string[];
  overview: string[];
  features: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};

export const servicesContent: Record<string, ServicePageContent> = {
  "saglik-reklamciligi": {
    heroTagline: "Sağlık Reklamcılığı",
    heroDescription:
      "Hastaneler, tıp merkezleri ve klinikler için mevzuata tam uyumlu, hasta güveni odaklı, sonuç getiren reklam yönetimi.",
    highlights: [
      "Sağlık Bakanlığı reklam yönetmeliğine uyum",
      "Hasta psikolojisine uygun mesajlaşma",
      "Uçtan uca kampanya yönetimi",
    ],
    overview: [
      "Sağlık reklamcılığı, standart dijital pazarlamadan çok daha hassas bir alandır: yanlış bir mesaj hem marka güvenini hem de yasal uyumluluğu riske atabilir. Puhu Media olarak sağlık sektörüne özgü mevzuatı, platform politikalarını ve hasta karar verme sürecini derinlemesine biliyoruz.",
      "Hastane, tıp merkezi, klinik ve doktor markaları için arama motoru, sosyal medya ve display kanallarında; randevu ve başvuru odaklı, ölçülebilir kampanyalar kurguluyoruz.",
    ],
    features: [
      {
        title: "Mevzuata Uygun İçerik",
        description:
          "Sağlık Bakanlığı reklam yönetmeliği ve platform politikalarına (Google, Meta) uygun metin ve görsel üretimi.",
      },
      {
        title: "Randevu Odaklı Kampanyalar",
        description:
          "Arama, display ve sosyal medyada doğrudan randevu/başvuru hedefleyen performans kampanyaları.",
      },
      {
        title: "Marka Güveni İnşası",
        description:
          "Hasta yorumları, doktor profilleri ve başarı hikayeleriyle güven veren bir dijital varlık oluşturulması.",
      },
      {
        title: "Şeffaf Raporlama",
        description:
          "Kampanya performansını haftalık/aylık raporlarla takip eder, verilere dayalı optimizasyon yaparız.",
      },
    ],
    faqs: [
      {
        question: "Sağlık reklamlarında hangi platformlarda yayın yapılabiliyor?",
        answer:
          "Google Ads, Meta (Instagram/Facebook) ve programatik display ağlarında, her platformun sağlık içerik politikalarına uygun şekilde yayın yapıyoruz.",
      },
      {
        question: "Reklam onay sürecinde gecikme yaşanır mı?",
        answer:
          "Platformların sağlık kategorisi incelemeleri standart kampanyalara göre daha uzun sürebilir; bu süreci öngörüp kampanya takviminizi buna göre planlıyoruz.",
      },
    ],
  },
  "saglik-turizmi-pazarlamasi": {
    heroTagline: "Sağlık Turizmi Pazarlaması",
    heroDescription:
      "Uluslararası hasta kazanımı için çok dilli, kültüre duyarlı ve dönüşüm odaklı dijital pazarlama stratejileri.",
    highlights: [
      "Çok dilli içerik ve reklam yönetimi",
      "Hedef pazara özel kanal stratejisi",
      "Uluslararası hasta yolculuğu tasarımı",
    ],
    overview: [
      "Sağlık turizminde hasta kazanımı; doğru pazarı seçmek, o pazarın diline ve kültürüne uygun içerik üretmek ve güven veren bir başvuru süreci tasarlamak ile başlar. Puhu Media, hedef pazarınıza göre özelleştirilmiş SEO, sosyal medya ve reklam stratejileri kurgular.",
      "İngilizce, Arapça ve Rusça başta olmak üzere hedef pazara özel dil ve kültürel uyarlamayla, uluslararası hastaların güvenini kazanan bir dijital deneyim oluşturuyoruz.",
    ],
    features: [
      {
        title: "Çok Dilli SEO & İçerik",
        description:
          "Hedef ülkelerin arama alışkanlıklarına göre optimize edilmiş çok dilli web içeriği ve blog stratejisi.",
      },
      {
        title: "Uluslararası Reklam Yönetimi",
        description:
          "Google ve Meta üzerinde hedef ülkelere özel, yerel dilde ve yerel ödeme/iletişim alışkanlıklarına uygun reklamlar.",
      },
      {
        title: "WhatsApp & Canlı Destek Entegrasyonu",
        description:
          "Uluslararası hastaların hızlıca iletişime geçebileceği çok dilli WhatsApp ve form entegrasyonları.",
      },
      {
        title: "Hasta Yolculuğu Optimizasyonu",
        description:
          "İlk temastan tedavi sonrası sürece kadar tüm dijital temas noktalarının kullanıcı deneyimi optimizasyonu.",
      },
    ],
    faqs: [
      {
        question: "Hangi ülke pazarlarına yönelik çalışma yapıyorsunuz?",
        answer:
          "Avrupa, Orta Doğu ve BDT ülkeleri başta olmak üzere, markanızın hedeflediği pazara göre özelleştirilmiş stratejiler kurguluyoruz.",
      },
      {
        question: "Çeviri kalitesi nasıl sağlanıyor?",
        answer:
          "Sadece çeviri değil, hedef dile ve kültüre uygun pazarlama diliyle yerelleştirme (lokalizasyon) yapıyoruz.",
      },
    ],
  },
  seo: {
    heroTagline: "SEO",
    heroDescription:
      "Teknik altyapıdan içerik stratejisine kadar arama motorlarında sürdürülebilir, organik büyüme.",
    highlights: [
      "Teknik SEO denetimi ve iyileştirme",
      "Anahtar kelime & içerik stratejisi",
      "Core Web Vitals performans optimizasyonu",
    ],
    overview: [
      "SEO; tek seferlik bir işlem değil, sürekli optimize edilen bir süreçtir. Teknik altyapı sorunlarından içerik boşluklarına, site hızından mobil deneyime kadar arama motorlarının önem verdiği tüm alanlarda çalışıyoruz.",
      "Hedefimiz sadece sıralama değil; doğru niyetteki kullanıcıyı sitenize getirip dönüşüme ulaştırmaktır.",
    ],
    features: [
      {
        title: "Teknik SEO Denetimi",
        description:
          "Site hızı, dizinlenebilirlik, yapısal veri (schema) ve mobil uyumluluk dahil kapsamlı teknik analiz.",
      },
      {
        title: "Anahtar Kelime Stratejisi",
        description:
          "Sektörünüze ve hedef kitlenize özel arama hacmi yüksek, dönüşüme yakın anahtar kelime haritası.",
      },
      {
        title: "İçerik Optimizasyonu",
        description:
          "Mevcut ve yeni içeriklerin arama motoru ve kullanıcı deneyimi için optimize edilmesi.",
      },
      {
        title: "Link & Otorite Çalışması",
        description:
          "Sektörel otoriteyi artıracak etik ve sürdürülebilir bağlantı (backlink) stratejileri.",
      },
    ],
    faqs: [
      {
        question: "SEO çalışmalarının sonuçlarını ne zaman görürüz?",
        answer:
          "Rekabete ve mevcut site durumuna göre değişmekle birlikte, genellikle ilk somut sonuçlar 3-6 ay içinde görülmeye başlar.",
      },
      {
        question: "Mevcut web sitemizle çalışabilir misiniz?",
        answer:
          "Evet, mevcut sitenizde teknik denetim yaparak öncelikli iyileştirme alanlarını belirliyor ve aşamalı bir yol haritası sunuyoruz.",
      },
    ],
  },
  "google-ads": {
    heroTagline: "Google Ads",
    heroDescription:
      "Arama, display ve YouTube reklamlarıyla doğru kullanıcıya doğru anda ulaşan, yüksek dönüşümlü kampanyalar.",
    highlights: [
      "Dönüşüm odaklı kampanya kurulumu",
      "Sürekli teklif & bütçe optimizasyonu",
      "Detaylı performans raporlama",
    ],
    overview: [
      "Google Ads; doğru anahtar kelime, teklif stratejisi ve reklam metni birleştiğinde güçlü bir dönüşüm kanalına dönüşür. Kampanyalarınızı sektörünüze ve hedeflerinize göre kurgular, sürekli veri odaklı optimize ederiz.",
    ],
    features: [
      {
        title: "Arama Ağı Kampanyaları",
        description: "Yüksek niyetli aramalarda görünürlük ve dönüşüm odaklı arama reklamları.",
      },
      {
        title: "Display & Yeniden Pazarlama",
        description:
          "Sitenizi ziyaret eden ama dönüşmeyen kullanıcılara özel yeniden pazarlama kampanyaları.",
      },
      {
        title: "YouTube Reklamları",
        description: "Video içeriklerinizle marka bilinirliği ve etkileşim odaklı YouTube kampanyaları.",
      },
      {
        title: "Dönüşüm Takibi & Analiz",
        description:
          "Google Analytics ve dönüşüm izleme kurulumlarıyla her tıklamanın performansını ölçüyoruz.",
      },
    ],
    faqs: [
      {
        question: "Minimum reklam bütçesi ne kadar olmalı?",
        answer:
          "Sektöre ve rekabete göre değişir; ilk görüşmede hedeflerinize uygun gerçekçi bir bütçe önerisi sunuyoruz.",
      },
      {
        question: "Kampanya sonuçlarını nasıl raporluyorsunuz?",
        answer:
          "Düzenli aralıklarla tıklama, dönüşüm, maliyet ve ROAS metriklerini içeren şeffaf raporlar paylaşıyoruz.",
      },
    ],
  },
  "meta-reklamlari": {
    heroTagline: "Meta Reklamları",
    heroDescription:
      "Instagram ve Facebook'ta hedef kitlenizin dikkatini çeken, dönüşüm getiren reklam kampanyaları.",
    highlights: [
      "Hedef kitle segmentasyonu",
      "Kreatif reklam formatları",
      "A/B test ile sürekli optimizasyon",
    ],
    overview: [
      "Meta platformlarında başarı; doğru hedef kitle, güçlü kreatif ve sürekli test etme disipliniyle gelir. Marka bilinirliğinden doğrudan dönüşüme kadar farklı hedeflere uygun kampanya yapıları kurguluyoruz.",
    ],
    features: [
      {
        title: "Hedef Kitle Stratejisi",
        description: "Demografik, ilgi alanı ve davranışsal verilerle hassas hedef kitle segmentasyonu.",
      },
      {
        title: "Kreatif Reklam Üretimi",
        description: "Statik, video ve carousel formatlarında dikkat çekici reklam kreatifleri.",
      },
      {
        title: "A/B Test Yönetimi",
        description: "Farklı kreatif ve mesaj varyasyonlarının test edilerek en iyi performansın bulunması.",
      },
      {
        title: "Pixel & Dönüşüm Kurulumu",
        description: "Meta Pixel ve Conversions API kurulumlarıyla doğru ölçümleme ve optimizasyon.",
      },
    ],
    faqs: [
      {
        question: "Hangi hedeflerle kampanya kurgulayabiliyorsunuz?",
        answer:
          "Marka bilinirliği, trafik, mesaj/randevu talebi ve doğrudan satış gibi farklı hedeflere göre kampanya yapısı kurguluyoruz.",
      },
      {
        question: "Reklam görselleri sizin tarafınızdan mı üretiliyor?",
        answer:
          "Evet, video prodüksiyon ve içerik üretim ekibimizle platform ve hedefe uygun kreatifler üretiyoruz.",
      },
    ],
  },
  "sosyal-medya-yonetimi": {
    heroTagline: "Sosyal Medya Yönetimi",
    heroDescription:
      "Stratejik içerik takvimi, özgün görsel dil ve aktif topluluk yönetimiyle markanızın sosyal medyadaki sesi oluyoruz.",
    highlights: [
      "Aylık içerik takvimi ve üretimi",
      "Topluluk yönetimi ve etkileşim",
      "Performans odaklı raporlama",
    ],
    overview: [
      "Sosyal medya; markanızın günlük yüzü haline gelir. Sadece paylaşım yapmak değil, tutarlı bir marka sesi, özgün görsel dil ve aktif bir topluluk yönetimiyle gerçek bağlılık oluşturmayı hedefliyoruz.",
    ],
    features: [
      {
        title: "İçerik Takvimi & Üretimi",
        description: "Markanıza özel aylık içerik takvimi, metin ve görsel üretim süreci.",
      },
      {
        title: "Topluluk Yönetimi",
        description: "Yorum, mesaj ve etkileşimlerin zamanında ve marka sesine uygun yönetilmesi.",
      },
      {
        title: "Trend & Format Takibi",
        description: "Platform trendlerini takip ederek reels, story ve etkileşim formatlarının kullanılması.",
      },
      {
        title: "Aylık Performans Raporu",
        description: "Erişim, etkileşim ve takipçi büyümesini içeren detaylı aylık raporlama.",
      },
    ],
    faqs: [
      {
        question: "Hangi platformları yönetiyorsunuz?",
        answer:
          "Ağırlıklı olarak Instagram, Facebook, LinkedIn ve YouTube olmak üzere markanıza uygun platformlarda yönetim sağlıyoruz.",
      },
      {
        question: "İçerik onay süreci nasıl işliyor?",
        answer:
          "Aylık içerik takvimini önceden sizinle paylaşır, onayınız sonrası yayına alırız.",
      },
    ],
  },
  "yapay-zeka-destekli-pazarlama": {
    heroTagline: "Yapay Zeka Destekli Pazarlama",
    heroDescription:
      "Yapay zeka araçlarıyla içerik üretimini hızlandırıyor, kampanya performansını veri odaklı optimize ediyoruz.",
    highlights: [
      "AI destekli içerik üretim süreci",
      "Otomatik performans optimizasyonu",
      "Kişiselleştirilmiş pazarlama akışları",
    ],
    overview: [
      "Yapay zeka; pazarlamada hızı ve kişiselleştirmeyi artıran güçlü bir araçtır. İçerik üretiminden reklam optimizasyonuna, müşteri segmentasyonundan otomasyon akışlarına kadar yapay zekayı stratejik olarak sürece entegre ediyoruz.",
    ],
    features: [
      {
        title: "AI Destekli İçerik Üretimi",
        description: "Metin ve görsel üretim süreçlerinde yapay zeka araçlarıyla hız ve verimlilik.",
      },
      {
        title: "Akıllı Kampanya Optimizasyonu",
        description: "Reklam performans verilerinin AI destekli analiziyle sürekli optimizasyon.",
      },
      {
        title: "Kişiselleştirilmiş Pazarlama",
        description: "Kullanıcı davranışına göre kişiselleştirilmiş e-posta ve mesajlaşma akışları.",
      },
      {
        title: "Chatbot & Otomasyon",
        description: "Web sitesi ve WhatsApp için müşteri sorularını yanıtlayan akıllı otomasyon çözümleri.",
      },
    ],
    faqs: [
      {
        question: "Yapay zeka içerik üretimi marka sesimizi koruyor mu?",
        answer:
          "AI araçlarını her zaman insan editör kontrolüyle kullanıyoruz; marka diliniz ve kalite standartlarınız korunur.",
      },
      {
        question: "Hangi süreçlerde yapay zeka kullanılıyor?",
        answer:
          "İçerik taslakları, reklam metni varyasyonları, performans analizi ve müşteri etkileşim otomasyonlarında kullanıyoruz.",
      },
    ],
  },
  "kurumsal-kimlik": {
    heroTagline: "Kurumsal Kimlik",
    heroDescription:
      "Markanızın değerlerini yansıtan, tutarlı ve güven veren bir görsel kimlik sistemi tasarlıyoruz.",
    highlights: [
      "Logo ve marka kimliği tasarımı",
      "Marka kılavuzu (brand guideline)",
      "Kurumsal iletişim materyalleri",
    ],
    overview: [
      "Güçlü bir kurumsal kimlik; markanızın ilk izlenimini belirler ve her temas noktasında güven inşa eder. Logo, renk paleti, tipografi ve görsel dilden oluşan kapsamlı bir kimlik sistemi tasarlıyoruz.",
    ],
    features: [
      {
        title: "Logo & Marka Tasarımı",
        description: "Markanızın değerlerini yansıtan özgün logo ve görsel kimlik tasarımı.",
      },
      {
        title: "Marka Kılavuzu",
        description: "Renk, tipografi ve kullanım kurallarını içeren kapsamlı marka kılavuzu dokümanı.",
      },
      {
        title: "Kurumsal Materyaller",
        description: "Kartvizit, antetli kağıt, sunum şablonu gibi kurumsal iletişim materyalleri.",
      },
      {
        title: "Dijital Kimlik Uyumu",
        description: "Web sitesi ve sosyal medya için tutarlı görsel kimlik uygulaması.",
      },
    ],
    faqs: [
      {
        question: "Mevcut logomuzu güncellemek (rebranding) mümkün mü?",
        answer:
          "Evet, mevcut marka kimliğinizi analiz ederek güncel ve güçlü bir versiyonuna dönüştürebiliriz.",
      },
      {
        question: "Süreç ne kadar sürüyor?",
        answer:
          "Kapsamına göre değişmekle birlikte, kurumsal kimlik projeleri genellikle 3-6 hafta içinde tamamlanır.",
      },
    ],
  },
  "web-tasarim": {
    heroTagline: "Web Tasarım & Yazılım",
    heroDescription:
      "Premium, hızlı, mobil uyumlu ve dönüşüm odaklı kurumsal web siteleri ve yazılım çözümleri geliştiriyoruz.",
    highlights: [
      "Modern ve hızlı teknoloji altyapısı",
      "SEO uyumlu, dönüşüm odaklı tasarım",
      "Yönetim panelli özel yazılım geliştirme",
    ],
    overview: [
      "Web siteniz markanızın dijital vitrinidir. Sadece görsel olarak etkileyici değil; hızlı, güvenli, SEO uyumlu ve dönüşüm odaklı bir yapı kuruyoruz. Kurumsal siteler, landing page'ler ve özel yönetim panelli yazılım çözümleri geliştiriyoruz.",
    ],
    features: [
      {
        title: "Kurumsal Web Sitesi",
        description: "Premium tasarım standartlarında, hızlı ve mobil uyumlu kurumsal web siteleri.",
      },
      {
        title: "Yönetim Paneli",
        description: "Kod bilgisi gerektirmeyen, içerik ve form yönetimi sağlayan özel admin panelleri.",
      },
      {
        title: "Performans & SEO",
        description: "Core Web Vitals standartlarında hız optimizasyonu ve teknik SEO altyapısı.",
      },
      {
        title: "Güvenlik & Bakım",
        description: "Güvenlik standartlarına uygun geliştirme ve düzenli bakım/güncelleme desteği.",
      },
    ],
    faqs: [
      {
        question: "Hangi teknolojileri kullanıyorsunuz?",
        answer:
          "Projenin ihtiyacına göre güncel ve endüstri standardı teknolojiler seçiyoruz; öncelik her zaman hız, güvenlik ve sürdürülebilirlik.",
      },
      {
        question: "Site içeriklerini kendimiz güncelleyebilir miyiz?",
        answer:
          "Evet, geliştirdiğimiz yönetim panelleri kod bilgisi gerektirmeden içerik güncellemesi yapmanıza olanak tanır.",
      },
    ],
  },
  "icerik-uretimi": {
    heroTagline: "İçerik Üretimi",
    heroDescription:
      "Blog yazılarından sosyal medya metinlerine, markanızın sesini yansıtan stratejik içerik üretimi.",
    highlights: [
      "SEO uyumlu blog içerikleri",
      "Marka sesine uygun metin yazarlığı",
      "Çok kanallı içerik stratejisi",
    ],
    overview: [
      "Kaliteli içerik; hem arama motorlarında görünürlük hem de hedef kitlenizle gerçek bir bağ kurmanın temelidir. Blog, sosyal medya, e-posta ve web sitesi için stratejik ve SEO uyumlu içerikler üretiyoruz.",
    ],
    features: [
      {
        title: "Blog & SEO İçerikleri",
        description: "Arama niyetine uygun, sektörel otorite kuran blog yazıları.",
      },
      {
        title: "Marka Sesi Geliştirme",
        description: "Markanıza özgü ton ve dil kimliğinin tüm içeriklerde tutarlı uygulanması.",
      },
      {
        title: "Çok Kanallı İçerik",
        description: "Web, sosyal medya ve e-posta için birbirini destekleyen içerik stratejisi.",
      },
      {
        title: "İçerik Takvimi Yönetimi",
        description: "Düzenli yayın akışı sağlayan aylık içerik planlama ve üretim süreci.",
      },
    ],
    faqs: [
      {
        question: "İçerikler hangi dillerde üretiliyor?",
        answer:
          "Öncelikli olarak Türkçe üretim yapıyoruz; sağlık turizmi gibi uluslararası hedefli projelerde çok dilli içerik de sağlıyoruz.",
      },
      {
        question: "İçerik konuları nasıl belirleniyor?",
        answer:
          "Anahtar kelime araştırması, rakip analizi ve hedef kitle ihtiyaçlarına göre veri odaklı bir içerik planı oluşturuyoruz.",
      },
    ],
  },
  "video-produksiyon": {
    heroTagline: "Video Prodüksiyon",
    heroDescription:
      "Reklam filmi, kurumsal tanıtım filmi ve sosyal medya videolarında senaryodan son montaja uçtan uca prodüksiyon.",
    highlights: [
      "Reklam & tanıtım filmi çekimi",
      "Sosyal medya video içerikleri",
      "Profesyonel kurgu ve post prodüksiyon",
    ],
    overview: [
      "Video; markanızın hikayesini en etkili şekilde anlatan formattır. Reklam filmlerinden kurumsal tanıtım videolarına, sosyal medya içeriklerinden ürün videolarına kadar senaryo, çekim ve kurgu süreçlerinin tamamını profesyonel ekipmanla yönetiyoruz.",
    ],
    features: [
      {
        title: "Reklam Filmi Prodüksiyonu",
        description: "Senaryo geliştirmeden çekime, marka mesajınızı güçlü anlatan reklam filmleri.",
      },
      {
        title: "Kurumsal Tanıtım Filmi",
        description: "Marka hikayenizi ve değerlerinizi anlatan kurumsal tanıtım videoları.",
      },
      {
        title: "Sosyal Medya Video İçerikleri",
        description: "Reels ve kısa format videolar için platforma özel içerik üretimi.",
      },
      {
        title: "Post Prodüksiyon & Kurgu",
        description: "Renk düzenleme, ses tasarımı ve profesyonel kurgu ile yayına hazır içerik.",
      },
    ],
    faqs: [
      {
        question: "Çekim için stüdyoya mı geliyorsunuz, yoksa saha çekimi mi yapıyorsunuz?",
        answer:
          "Projenin ihtiyacına göre hem stüdyo hem de saha (klinik, ofis, mekan) çekimleri gerçekleştiriyoruz.",
      },
      {
        question: "Video teslim süreleri ne kadar?",
        answer:
          "Prodüksiyon kapsamına göre değişmekle birlikte, çoğu proje 2-4 hafta içinde teslim edilir.",
      },
    ],
  },
  "urun-fotografciligi": {
    heroTagline: "Ürün Fotoğrafçılığı",
    heroDescription:
      "E-ticaret ve katalog kullanımına uygun, profesyonel ışıklandırma ve kompozisyonla ürün çekimleri.",
    highlights: [
      "Stüdyo ve saha çekim seçenekleri",
      "E-ticaret platformlarına uygun format",
      "Profesyonel retouch ve renk düzenleme",
    ],
    overview: [
      "Ürün fotoğrafı, bir e-ticaret markasının satın alma kararında en kritik unsurlardan biridir. Profesyonel ışıklandırma, kompozisyon ve düzenleme ile ürünlerinizi en iyi şekilde yansıtan görseller üretiyoruz.",
    ],
    features: [
      {
        title: "Stüdyo Çekimi",
        description: "Beyaz fon ve yaratıcı kompozisyonlarla profesyonel stüdyo ürün çekimi.",
      },
      {
        title: "Lifestyle Çekim",
        description: "Ürünün kullanım anını yansıtan, gerçek ortamda çekilen lifestyle görseller.",
      },
      {
        title: "Retouch & Renk Düzenleme",
        description: "Renk doğruluğu ve detay netliği için profesyonel görsel düzenleme.",
      },
      {
        title: "Platform Uyumlu Teslim",
        description: "Trendyol, Hepsiburada, Instagram gibi platformlara uygun format ve boyutlarda teslim.",
      },
    ],
    faqs: [
      {
        question: "Kaç üründen oluşan çekimler için hizmet veriyorsunuz?",
        answer:
          "Tek ürün çekiminden geniş katalog projelerine kadar her ölçekte hizmet sunuyoruz.",
      },
      {
        question: "Ürünlerin bize gönderilmesi mi gerekiyor?",
        answer:
          "Stüdyo çekimlerinde ürünlerin stüdyomuza ulaştırılması gerekir; saha çekimlerinde ekibimiz sizin mekanınıza gelir.",
      },
    ],
  },
  "ozel-gun-cekimleri": {
    heroTagline: "Özel Gün Çekimleri",
    heroDescription:
      "Düğün, nişan ve özel organizasyonlarınızı profesyonel fotoğraf ve video ile ölümsüzleştiriyoruz.",
    highlights: [
      "Düğün & nişan fotoğraf/video çekimi",
      "Doğal ve sinematik anlatım",
      "Aynı gün özet video (highlight) seçeneği",
    ],
    overview: [
      "Özel gününüzün anılarını, doğal ve sinematik bir anlatımla profesyonelce belgeliyoruz. Düğün, nişan, kına ve özel organizasyonlarınız için fotoğraf ve video ekiplerimizle yanınızdayız.",
    ],
    features: [
      {
        title: "Düğün Fotoğraf & Video",
        description: "Törenden eğlenceye, gününüzün tüm anlarını profesyonel ekiple belgeliyoruz.",
      },
      {
        title: "Nişan & Kına Çekimleri",
        description: "Özel organizasyonlarınız için doğal ve samimi fotoğraf/video anlatımı.",
      },
      {
        title: "Sinematik Kurgu",
        description: "Duygusal ve akıcı bir hikaye anlatımıyla profesyonel video kurgusu.",
      },
      {
        title: "Hızlı Teslim Seçenekleri",
        description: "Talep üzerine aynı gün özet video (highlight) ve hızlı fotoğraf teslimi.",
      },
    ],
    faqs: [
      {
        question: "Şehir dışı organizasyonlara geliyor musunuz?",
        answer:
          "Evet, planlama yapılması koşuluyla şehir dışı ve yurt dışı organizasyonlara da hizmet veriyoruz.",
      },
      {
        question: "Çekilen görsellerin teslim süresi ne kadar?",
        answer:
          "Düzenlenmiş fotoğraf ve video teslimi genellikle 2-4 hafta içinde tamamlanır; hızlandırılmış seçenekler de mevcuttur.",
      },
    ],
  },
  "kurumsal-fotograf": {
    heroTagline: "Kurumsal Fotoğraf Çekimi",
    heroDescription:
      "Doktor, klinik ve marka temsilinde güven veren, profesyonel portre ve mekan fotoğrafçılığı.",
    highlights: [
      "Doktor & ekip portre çekimi",
      "Klinik/ofis mekan fotoğrafçılığı",
      "Kurumsal web ve sosyal medya için optimize görsel",
    ],
    overview: [
      "Doğru kurumsal fotoğraflar, markanızın güvenilirliğini ilk bakışta yansıtır. Doktor ve ekip portrelerinden klinik/ofis mekan çekimlerine kadar, web sitenizde ve sosyal medyanızda kullanılacak profesyonel görseller üretiyoruz.",
    ],
    features: [
      {
        title: "Profesyonel Portre Çekimi",
        description: "Doktor ve ekip üyeleri için güven veren, profesyonel portre fotoğrafları.",
      },
      {
        title: "Mekan Fotoğrafçılığı",
        description: "Klinik, hastane veya ofis mekanlarının en iyi açılardan profesyonel çekimi.",
      },
      {
        title: "Web & Sosyal Medya Optimizasyonu",
        description: "Görsellerin web sitesi ve sosyal medya kullanımına uygun format ve boyutlarda teslimi.",
      },
      {
        title: "Marka Kimliğine Uyumlu Retouch",
        description: "Marka görsel diline uygun renk ve ton düzenlemesiyle tutarlı bir görsel kimlik.",
      },
    ],
    faqs: [
      {
        question: "Çekim için mekanınıza mı geliyorsunuz?",
        answer:
          "Evet, kurumsal fotoğraf çekimlerini genellikle sizin klinik veya ofis mekanınızda gerçekleştiriyoruz.",
      },
      {
        question: "Kaç kişilik ekipler için çekim yapabiliyorsunuz?",
        answer:
          "Tek doktor portresinden geniş ekip çekimlerine kadar her ölçekte hizmet veriyoruz.",
      },
    ],
  },
};
