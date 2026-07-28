import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-surface-card-hover)] text-[var(--color-text-primary)]",
        safe:
          "border-transparent bg-[var(--color-safety-safe-bg)] text-[var(--color-safety-safe)]",
        warning:
          "border-transparent bg-[var(--color-safety-warning-bg)] text-[var(--color-safety-warning)]",
        danger:
          "border-transparent bg-[var(--color-safety-danger-bg)] text-[var(--color-safety-danger)]",
        outline: "text-[var(--color-text-primary)] border-[var(--color-surface-card-hover)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
