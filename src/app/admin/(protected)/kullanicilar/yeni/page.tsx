import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { canManageUsers } from "@/lib/admin/permissions";
import { PageHeader } from "@/components/admin/page-header";
import { UserCreateForm } from "../user-form";

export const metadata: Metadata = {
  title: "Yeni Kullanıcı",
  robots: { index: false, follow: false },
};

export default async function NewUserPage() {
  const session = await auth();
  if (!session?.user || !canManageUsers(session.user.role)) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader
        title="Yeni Kullanıcı"
        description="Yönetim paneline yeni bir hesap ekleyin."
      />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <UserCreateForm />
      </div>
    </div>
  );
}
