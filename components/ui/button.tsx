import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-3 border text-[15px] font-bold tracking-[0.08em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-[var(--orange)] bg-[var(--orange)] px-7 text-white hover:border-[var(--ink)] hover:bg-[var(--ink)]",
        outline:
          "border-[var(--ink)] bg-transparent px-7 text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white",
        inverse:
          "border-white bg-transparent px-7 text-white hover:bg-white hover:text-[var(--ink)]",
        ghost:
          "min-h-10 border-transparent bg-transparent px-3 text-[var(--ink)] hover:bg-[var(--paper-soft)]",
      },
      size: {
        default: "h-13",
        lg: "h-16 px-9 text-base",
        icon: "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
