export type Role = "SUPERADMIN" | "ADMIN" | "EDITOR" | "AUTHOR";

export const CONTENT_ROLES: Role[] = ["SUPERADMIN", "ADMIN", "EDITOR", "AUTHOR"];
export const ADMIN_ROLES: Role[] = ["SUPERADMIN", "ADMIN"];

export function canManageUsers(role: string): boolean {
  return role === "SUPERADMIN";
}

export function canManageSettings(role: string): boolean {
  return ADMIN_ROLES.includes(role as Role);
}

export function canManageContent(role: string): boolean {
  return CONTENT_ROLES.includes(role as Role);
}
