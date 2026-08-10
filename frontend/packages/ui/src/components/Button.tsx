import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-lg)] font-medium transition-all duration-150 active:scale-[0.98] focus-ring touch-target disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-hover)]",
        destructive: "bg-[var(--color-safety-danger)] text-white hover:bg-[var(--color-safety-danger-hover)]",
        outline: "border border-[var(--color-surface-card-hover)] bg-transparent hover:bg-[var(--color-surface-card)] text-[var(--color-text-primary)]",
        secondary: "bg-[var(--color-surface-card)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-card-hover)]",
        ghost: "hover:bg-[var(--color-surface-card)] text-[var(--color-text-primary)]",
      },
      size: {
        default: "h-12 px-6 py-2", // 48px height minimum for mobile touch targets
        sm: "h-10 px-4", // Slightly smaller, still > 40px
        lg: "h-14 px-8 text-lg", // Very large for prominent actions (SOS, start trip)
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
