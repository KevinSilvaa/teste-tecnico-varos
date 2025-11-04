import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: 'cursor-pointer rounded-md text-base outline-none transition-all hover:bg-opacity-90 border border-gray-800 flex gap-2 disabled:opacity-50 disabled:cursor-not-allowed justify-center items-center duration-300',
  variants: {
    variant: {
      primary:
        'bg-green-800 text-s-green',
      secondary:
        'bg-gray-900 text-gray-600 border border-gray-800',
    },
    size: {
      base: 'p-4',
      rounded: 'rounded-full',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'base',
  },
})

type ButtonProps = ComponentPropsWithRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({
  className,
  size = 'base',
  variant,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    />
  )
}