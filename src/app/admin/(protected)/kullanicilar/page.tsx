import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import { canManageUsers } from "@/lib/admin/permissions";
import { getAllUsers } from "@/server/repositories/user.repository";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import {
  deleteUserAction,
  toggleUserActiveAction,
} from "@/server/actions/user.actions";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

export const metadata: Metadata = {
  title: "Kullanıcılar",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user || !canManageUsers(session.user.role)) {
    redirect("/admin");
  }

  const users = await getAllUsers();

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Kullanıcılar"
        description="Yönetim paneli kullanıcılarını ekleyin veya yönetin."
        actions={
          <Button asChild className="rounded-full">
            <Link href="/admin/kullanicilar/yeni">
              <Plus className="size-4" />
              Yeni Kullanıcı
            </Link>
          </Button>
        }
      />

      <div className="mt-8 space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-heading font-medium text-foreground">
                  {user.name}
                </p>
                <StatusBadge
                  variant={user.isActive ? "active" : "inactive"}
                  label={user.role}
                />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
              {user.lastLoginAt ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  Son giriş: {user.lastLoginAt.toLocaleString("tr-TR")}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <form
                action={async () => {
                  "use server";
                  await toggleUserActiveAction(user.id, !user.isActive);
                }}
              >
                <Button type="submit" size="sm" variant="outline">
                  {user.isActive ? "Pasifleştir" : "Aktifleştir"}
                </Button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await deleteUserAction(user.id);
                }}
              >
                <ConfirmSubmitButton
                  className="rounded-lg"
                  confirmMessage="Bu kullanıcı kalıcı olarak silinsin mi?"
                >
                  Sil
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
