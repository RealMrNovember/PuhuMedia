"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/admin/form-message";
import {
  changePasswordAction,
  updateProfileAction,
  type UserFormState,
} from "@/server/actions/user.actions";

export function ProfileForms({
  defaults,
}: {
  defaults: { name: string; email: string; role: string };
}) {
  const [profileState, profileAction, profilePending] = useActionState(
    updateProfileAction,
    {} as UserFormState
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    changePasswordAction,
    {} as UserFormState
  );

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-heading text-lg font-medium text-foreground">
          Profil bilgileri
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Rol: {defaults.role}</p>
        <form action={profileAction} className="mt-5 space-y-4">
          <FormMessage error={profileState.error} success={profileState.success} />
          <div className="space-y-1.5">
            <Label htmlFor="name">Ad Soyad</Label>
            <Input id="name" name="name" required defaultValue={defaults.name} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={defaults.email}
            />
          </div>
          <Button type="submit" disabled={profilePending} className="rounded-full">
            {profilePending ? <Loader2 className="size-4 animate-spin" /> : null}
            Profili Kaydet
          </Button>
        </form>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-heading text-lg font-medium text-foreground">
          Şifre değiştir
        </h2>
        <form action={passwordAction} className="mt-5 space-y-4">
          <FormMessage
            error={passwordState.error}
            success={passwordState.success}
            successMessage="Şifre güncellendi."
          />
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">Mevcut şifre</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              minLength={8}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">Yeni şifre</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={8}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Yeni şifre (tekrar)</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
            />
          </div>
          <Button type="submit" disabled={passwordPending} className="rounded-full">
            {passwordPending ? <Loader2 className="size-4 animate-spin" /> : null}
            Şifreyi Güncelle
          </Button>
        </form>
      </div>
    </>
  );
}
