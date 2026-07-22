import type { Metadata } from "next";
import Image from "next/image";
import { getAllMedia } from "@/server/repositories/media.repository";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { MediaUploadForm } from "./media-upload-form";
import { deleteMediaAction } from "@/server/actions/media.actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

export const metadata: Metadata = { title: "Medya", robots: { index: false, follow: false } };

export default async function AdminMediaPage() {
  const items = await getAllMedia();
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Medya Kütüphanesi" description="Görselleri yükleyin ve yönetin." />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <MediaUploadForm />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3"><EmptyState title="Henüz medya yok" /></div>
        ) : items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card">
            {item.mimeType.startsWith("image/") ? (
              <div className="relative aspect-video bg-secondary">
                <Image src={item.path} alt={item.alt ?? item.filename} fill className="object-cover" />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center bg-secondary text-sm text-muted-foreground">Dosya</div>
            )}
            <div className="space-y-2 p-4">
              <p className="truncate text-sm font-medium">{item.filename}</p>
              <p className="truncate text-xs text-muted-foreground">{item.path}</p>
              <form action={async () => { "use server"; await deleteMediaAction(item.id); }}>
                <ConfirmSubmitButton className="rounded-lg">Sil</ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
