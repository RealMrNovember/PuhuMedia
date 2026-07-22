import { prisma } from "@/lib/db";

export function getAllContacts() {
  return prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function getContactById(id: string) {
  return prisma.contactSubmission.findUnique({ where: { id } });
}

export function markContactRead(id: string, isRead = true) {
  return prisma.contactSubmission.update({ where: { id }, data: { isRead } });
}

export function deleteContact(id: string) {
  return prisma.contactSubmission.delete({ where: { id } });
}

export function countContacts() {
  return prisma.contactSubmission.count();
}

export function countUnreadContacts() {
  return prisma.contactSubmission.count({ where: { isRead: false } });
}
