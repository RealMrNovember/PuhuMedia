import { cn } from "@/lib/utils";

const variants = {
  published: "bg-emerald-500/10 text-emerald-700",
  draft: "bg-amber-500/10 text-amber-700",
  active: "bg-sky-500/10 text-sky-700",
  inactive: "bg-muted text-muted-foreground",
  new: "bg-primary/10 text-primary",
} as const;

const labels: Record<keyof typeof variants, string> = {
  published: "Yayında",
  draft: "Taslak",
  active: "Aktif",
  inactive: "Pasif",
  new: "Yeni",
};

export function StatusBadge({
  variant,
  label,
  className,
}: {
  variant: keyof typeof variants;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {label ?? labels[variant]}
    </span>
  );
}
