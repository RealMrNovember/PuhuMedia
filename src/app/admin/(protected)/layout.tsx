import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return <div className="min-h-svh bg-secondary/20">{children}</div>;
}
