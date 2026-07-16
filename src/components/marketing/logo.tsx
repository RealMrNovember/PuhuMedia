import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center", className)}
      aria-label="Puhu Media anasayfa"
    >
      <Image
        src="/brand/logo-wordmark.png"
        alt="Puhu Media"
        width={800}
        height={200}
        priority
        className="h-8 w-auto object-contain md:h-9"
      />
    </Link>
  );
}
