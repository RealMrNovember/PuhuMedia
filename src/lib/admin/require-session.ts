import { auth } from "@/lib/auth";

export async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Oturum gerekli");
  }
  return session;
}

export async function requireRole(roles: string[]) {
  const session = await requireSession();
  if (!roles.includes(session.user.role)) {
    throw new Error("Yetkisiz erişim");
  }
  return session;
}
