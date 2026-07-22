import { prisma } from "@/lib/db";
import type { Role } from "@/lib/admin/permissions";

export function getAllUsers() {
  return prisma.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function countSuperadmins() {
  return prisma.user.count({ where: { role: "SUPERADMIN", isActive: true } });
}

export function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
}) {
  return prisma.user.create({ data });
}

export function updateUser(
  id: string,
  data: Partial<{
    name: string;
    email: string;
    passwordHash: string;
    role: Role;
    isActive: boolean;
  }>
) {
  return prisma.user.update({ where: { id }, data });
}

export function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}
