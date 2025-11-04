"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { SearchableSelect as NativeSearchableSelect } from "@/app/_components/searchable-select";

type SearchableSelectProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  name: string;
  selectId: string;
  options: {
    label: string;
    publicId: string;
  }[];
  isRequired?: boolean;
};

export function SearchableSelect({
  selectId,
  options,
  name,
  ...props
}: SearchableSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
console.log({ field: field.value })
        return (
        <div className="flex flex-col gap-2">
          <NativeSearchableSelect
            selectId={selectId}
            options={options}
            {...props}
            {...field}
          />

          {!!error && (
            <span className="mt-0.5 text-xs text-red-600">{error.message}</span>
          )}
        </div>
      )
      }}
    />
  );
}
