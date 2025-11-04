"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input as NativeInput } from "@/components/ui/input";
import { handleInputMaskFunction } from "@/utils/functions/input-mask-function";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  startContent?: ReactNode;
  id: string;
  name: string;
  mask?: string;
  stripValue?: boolean;
  isRequired?: boolean;
};

export function Input({
  label,
  id,
  name,
  stripValue,
  isRequired = false,
  ...props
}: InputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          {label && (
            <label htmlFor={id} className="text-gray-600">
              {label} {isRequired && <span className="text-red-600">*</span>}
            </label>
          )}

          <NativeInput
            {...props}
            {...field}
            id={id}
            onChange={(e) => {
              if (props.mask) {
                handleInputMaskFunction(e, props.mask!);
                field.onChange(e);
              } else {
                field.onChange(e);
              }
            }}
          />

          {!!error && (
            <span className="mt-0.5 text-xs text-red-600">{error.message}</span>
          )}
        </div>
      )}
    />
  );
}
