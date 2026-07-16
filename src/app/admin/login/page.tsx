import type { Metadata } from "next";
import { Logo } from "@/components/marketing/logo";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Yönetici Girişi",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/admin";

  return (
    <div className="flex min-h-svh items-center justify-center bg-secondary/30 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-heading text-xl font-medium text-foreground">
          Yönetici Paneline Giriş
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Devam etmek için hesap bilgilerinizi girin
        </p>
        <div className="mt-8">
          <LoginForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  );
}
