import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserById } from "@/server/repositories/user.repository";
import { PageHeader } from "@/components/admin/page-header";
import { ProfileForms } from "./profile-forms";

export const metadata: Metadata = {
  title: "Profilim",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const user = await getUserById(session.user.id);
  if (!user) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader
        title="Profilim"
        description="Ad, e-posta ve şifre bilgilerinizi yönetin."
      />
      <div className="mt-8 space-y-6">
        <ProfileForms
          defaults={{ name: user.name, email: user.email, role: user.role }}
        />
      </div>
    </div>
  );
}
