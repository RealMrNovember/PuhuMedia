"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/admin/form-message";
import {
  createUserAction,
  type UserFormState,
} from "@/server/actions/user.actions";

export function UserCreateForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    createUserAction,
    {} as UserFormState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/admin/kullanicilar");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={action} className="space-y-5">
      <FormMessage error={state.error} success={state.success} />
      <div className="space-y-1.5">
        <Label htmlFor="name">Ad Soyad *</Label>
        <Input id="name" name="name" required minLength={2} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">E-posta *</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Şifre *</Label>
        <Input id="password" name="password" type="password" required minLength={8} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="role">Rol *</Label>
        <select
          id="role"
          name="role"
          defaultValue="EDITOR"
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="SUPERADMIN">SUPERADMIN</option>
          <option value="ADMIN">ADMIN</option>
          <option value="EDITOR">EDITOR</option>
          <option value="AUTHOR">AUTHOR</option>
        </select>
      </div>
      <Button type="submit" disabled={pending} className="rounded-full">
        {pending ? <Loader2 className="size-4 animate-spin" /> : null}
        Kullanıcı Oluştur
      </Button>
    </form>
  );
}
