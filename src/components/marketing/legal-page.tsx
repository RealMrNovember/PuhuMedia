import type { ReactNode } from "react";

export function LegalPageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section-padding">
      <div className="container-brand max-w-3xl">
        <h1 className="font-heading text-3xl font-medium text-foreground">
          {title}
        </h1>
        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
}

export function LegalHtml({ html }: { html: string }) {
  return (
    <div
      className="prose prose-neutral dark:prose-invert mt-8 max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
