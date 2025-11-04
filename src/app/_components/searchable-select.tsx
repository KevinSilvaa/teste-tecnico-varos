"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type SearchableSelectProps = {
  multiple?: boolean;
  label?: string;
  selectId: string;
  options: { publicId: string; label: string }[];
};

export function SearchableSelect({
  multiple = false,
  label,
  selectId,
  options,
}: SearchableSelectProps) {
  // keep single-select type for now; handle multiple separately if needed
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [currentQuery, setCurrentQuery] = useState<string | undefined>(
    undefined
  );

  const searchParams = new URLSearchParams(useSearchParams().toString());
  const router = useRouter();

  const filteredOptions = currentQuery
    ? options.filter((option) =>
        option.label.toLowerCase().includes(currentQuery.toLowerCase())
      )
    : options;

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    setSelected(value);

    const selectedValue = options.find((opt) => opt.publicId === value);

    if (selectedValue?.label) {
      params.set(selectId, selectedValue.label);
    } else {
      params.delete(selectId);
    }

    return router.replace(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label className="whitespace-nowrap text-xs text-gray-100">
          {label}
        </label>
      )}

      <Combobox
        value={selected}
        onChange={(value) => handleSelect(value as string)}
        multiple={multiple}
      >
        <div className="relative w-full">
          <ComboboxButton>
            <ComboboxInput
              className={clsx(
                "w-full rounded-lg border max-h-10 bg-gray-900 py-2.5 pr-8 pl-4 text-sm/6 border-gray-800 text-gray-600",
                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-800"
              )}
              displayValue={(value: string | undefined) =>
                options.find((opt) => opt.publicId === value)?.label ?? ""
              }
              placeholder="Selecione uma opcao"
              onChange={(event) => setCurrentQuery(event.target.value)}
            />

            <div className="group absolute inset-y-3.5 right-0 px-2.5">
              <ChevronDown className="size-4 text-gray-400" />
            </div>
          </ComboboxButton>

          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-800 bg-gray-900 px-1 py-1 text-sm">
            {filteredOptions.map((option) => (
              <ComboboxOption
                key={option.publicId}
                value={option.publicId}
                className="group flex cursor-default items-center gap-2 rounded px-2.5 py-2 select-none data-active:bg-neutral-alpha-weak"
              >
                <span className="text-gray-600">{option.label}</span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
