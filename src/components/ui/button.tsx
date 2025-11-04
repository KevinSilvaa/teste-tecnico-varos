import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";

const buttonVariants = tv({
  base: "cursor-pointer rounded-md text-base outline-none transition-all hover:bg-opacity-90 border border-gray-800 flex gap-2 disabled:opacity-50 disabled:cursor-not-allowed justify-center items-center duration-300",
  variants: {
    variant: {
      primary: "bg-green-800 text-s-green hover:bg-green-800/90",
      secondary:
        "bg-gray-900 text-gray-600 border border-gray-800 hover:bg-gray-900/90",
      outline:
        "border border-gray-900 bg-c-black shadow-xs hover:bg-c-black/90",
        ghost:
        'bg-transparent text-gray-400 disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50',
    },
    size: {
      base: "p-4",
      rounded: "rounded-full",
      icon: 'size-10'
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "base",
  },
});

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
