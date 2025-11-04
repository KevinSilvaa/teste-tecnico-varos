'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input as NativeInput } from "@/components/ui/input"

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string
  startContent?: ReactNode
  id: string
  name: string
  mask?: string
  stripValue?: boolean
  isRequired?: boolean
}

export function Input({
  label,
  id,
  name,
  stripValue,
  isRequired = false,
  ...props
}: InputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          {label && (
            <label
              htmlFor={id}
              className="whitespace-nowrap text-gray-600"
            >
              {label} {isRequired && <span className="text-red-600">*</span>}
            </label>
          )}

          <NativeInput
            {...props}
            {...field}
            id={id}
            error={!!error}
            onChange={(e) => {
              const rawValue = e.target.value
              const valueToSet = stripValue
                ? rawValue.replace(/\D/g, '')
                : rawValue

              field.onChange(valueToSet)
            }}
          />

          {!!error && (
            <span className="mt-0.5 text-xs text-red-600">{error.message}</span>
          )}
        </div>
      )}
    />
  )
}
