import { prisma } from "@/lib/db";
import type { LeadStatus } from "@/generated/prisma/enums";

export function getAllLeads() {
  return prisma.leadSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function getLeadById(id: string) {
  return prisma.leadSubmission.findUnique({ where: { id } });
}

export function updateLeadStatus(id: string, status: LeadStatus) {
  return prisma.leadSubmission.update({ where: { id }, data: { status } });
}

export function deleteLead(id: string) {
  return prisma.leadSubmission.delete({ where: { id } });
}

export function countLeads() {
  return prisma.leadSubmission.count();
}

export function countNewLeads() {
  return prisma.leadSubmission.count({ where: { status: "NEW" } });
}
