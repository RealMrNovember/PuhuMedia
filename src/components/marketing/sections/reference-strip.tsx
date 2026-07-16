import Image from "next/image";
import { getPublishedReferences } from "@/server/repositories/reference.repository";
import { Reveal } from "@/components/marketing/reveal";

export async function ReferenceStrip() {
  const references = await getPublishedReferences();

  if (references.length === 0) return null;

  return (
    <section className="border-y border-border bg-secondary/30 py-14">
      <div className="container-brand">
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Güvenle Çalıştığımız Kurumlar
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-80 grayscale">
          {references.map((reference) => (
            <Image
              key={reference.id}
              src={reference.logo}
              alt={reference.name}
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
