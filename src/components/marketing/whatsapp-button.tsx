import { WhatsappIcon } from "@/components/marketing/social-icons";
import { siteConfig } from "@/lib/site-config";

export function WhatsappButton() {
  const message = encodeURIComponent(
    "Merhaba, Puhu Media hakkında bilgi almak istiyorum."
  );

  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp.replace("+", "")}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ile iletişime geçin"
      className="fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 md:right-8 md:bottom-8"
    >
      <WhatsappIcon className="size-6" />
    </a>
  );
}
