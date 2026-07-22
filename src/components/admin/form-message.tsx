import { cn } from "@/lib/utils";

export function FormMessage({
  error,
  success,
  successMessage = "Kaydedildi.",
  className,
}: {
  error?: string;
  success?: boolean;
  successMessage?: string;
  className?: string;
}) {
  if (!error && !success) return null;

  return (
    <div
      className={cn(
        "rounded-lg border px-3.5 py-2.5 text-sm",
        error
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
        className
      )}
    >
      {error ?? successMessage}
    </div>
  );
}
