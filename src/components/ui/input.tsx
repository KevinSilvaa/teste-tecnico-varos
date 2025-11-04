'use client'

import { Eye, EyeOff } from 'lucide-react'
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useState,
} from 'react'
import InputMask from 'react-input-mask'

import { cn } from '@/utils/cn'

type InputProps = ComponentPropsWithoutRef<'input'> & {
  startContent?: ReactNode
  mask?: string
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      startContent,
      error,
      mask,
      className,
      id,
      value,
      name,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className={cn("flex flex-1 items-center rounded-md border text-gray-600 py-2 px-4 border-gray-800 bg-gray-900 focus-within:border-gray-800", {
        'border-error': error,
        'focus-within:border-brand': value,
      })}
      >
        {startContent && startContent}

        {mask ? (
          <InputMask
            inputRef={ref}
            mask={mask}
            type={type}
            id={id}
            value={value}
            name={name}
            className={cn(
              'flex-1 outline-none placeholder:text-sm placeholder:text-gray-600',
              className,
            )}
          />
        ) : (
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            id={id}
            value={value}
            name={name}
            className={cn(
              'flex-1 outline-none placeholder:text-sm placholder:text-gray-600',
              className,
            )}
            ref={ref}
            {...props}
          />
        )}

        {type === 'password' &&
          (showPassword ? (
            <Eye
              onClick={() => setShowPassword(false)}
              className="size-4 text-gray-600"
            />
          ) : (
            <EyeOff
              onClick={() => setShowPassword(true)}
              className="size-4 text-gray-600"
            />
          ))}
      </div>
    )
  },
)

Input.displayName = 'Input'
