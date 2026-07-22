"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function ConfirmSubmitButton({
  children,
  confirmMessage = "Bu işlemi onaylıyor musunuz?",
  variant = "destructive",
  className,
}: {
  children: React.ReactNode;
  confirmMessage?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      className={className}
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      {pending ? "İşleniyor..." : children}
    </Button>
  );
}
