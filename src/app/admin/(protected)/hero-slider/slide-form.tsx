"use client";

import * as React from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSlideFormState } from "@/server/actions/hero-slide.actions";

type SlideFormAction = (
  state: HeroSlideFormState,
  formData: FormData
) => Promise<HeroSlideFormState>;

type SlideDefaults = {
  title: string;
  subtitle: string;
  description: string;
  mediaType: "IMAGE" | "VIDEO";
  videoUrl: string;
  ctaLabel: string;
  ctaLink: string;
  imageUrl: string | null;
};

const initialState: HeroSlideFormState = {};

export function SlideForm({
  action,
  defaults,
}: {
  action: SlideFormAction;
  defaults?: Partial<SlideDefaults>;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [mediaType, setMediaType] = React.useState<"IMAGE" | "VIDEO">(
    defaults?.mediaType ?? "IMAGE"
  );

  React.useEffect(() => {
    if (state.success) {
      router.push("/admin/hero-slider");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="title" className="text-sm font-medium text-foreground">
            Başlık *
          </label>
          <input
            id="title"
            name="title"
            required
            minLength={2}
            defaultValue={defaults?.title}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="subtitle" className="text-sm font-medium text-foreground">
            Alt Başlık
          </label>
          <input
            id="subtitle"
            name="subtitle"
            defaultValue={defaults?.subtitle}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Açıklama
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={defaults?.description}
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Medya Türü *</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="mediaType"
              value="IMAGE"
              checked={mediaType === "IMAGE"}
              onChange={() => setMediaType("IMAGE")}
            />
            Görsel
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="mediaType"
              value="VIDEO"
              checked={mediaType === "VIDEO"}
              onChange={() => setMediaType("VIDEO")}
            />
            YouTube Video
          </label>
        </div>
      </div>

      {mediaType === "IMAGE" ? (
        <div className="space-y-1.5">
          <label htmlFor="image" className="text-sm font-medium text-foreground">
            Slayt Görseli {defaults?.imageUrl ? "(değiştirmek için yeni dosya seçin)" : "*"}
          </label>
          {defaults?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={defaults.imageUrl}
              alt=""
              className="h-32 w-auto rounded-lg border border-border object-cover"
            />
          ) : null}
          <input
            id="image"
            name="image"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Önerilen boyut: 1920x1080 veya daha büyük, geniş açılı görsel.
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          <label htmlFor="videoUrl" className="text-sm font-medium text-foreground">
            YouTube Video Linki *
          </label>
          <input
            id="videoUrl"
            name="videoUrl"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            defaultValue={defaults?.videoUrl}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">
            Video, ana sayfada sessiz ve otomatik oynatılan arka plan olarak gösterilir.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="ctaLabel" className="text-sm font-medium text-foreground">
            Buton Metni
          </label>
          <input
            id="ctaLabel"
            name="ctaLabel"
            placeholder="Teklif Al"
            defaultValue={defaults?.ctaLabel}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="ctaLink" className="text-sm font-medium text-foreground">
            Buton Linki
          </label>
          <input
            id="ctaLink"
            name="ctaLink"
            placeholder="/teklif-al"
            defaultValue={defaults?.ctaLink}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}

      <Button type="submit" className="rounded-full px-6" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        Kaydet
      </Button>
    </form>
  );
}
