import { WhatsappIcon } from "@/components/marketing/social-icons";
import { getContactInfo } from "@/server/repositories/site-setting.repository";
import { cn } from "@/lib/utils";

export async function WhatsappButton({ className }: { className?: string }) {
  const { whatsapp } = await getContactInfo();
  const message = encodeURIComponent(
    "Merhaba, Puhu Media hakkında bilgi almak istiyorum."
  );

  return (
    <a
      href={`https://wa.me/${whatsapp.replace("+", "")}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ile iletişime geçin"
      className={cn(
        "fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 md:right-8 md:bottom-8",
        className
      )}
    >
      <WhatsappIcon className="size-6" />
    </a>
  );
}
