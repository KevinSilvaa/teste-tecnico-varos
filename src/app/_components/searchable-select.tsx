"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
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
  const [selected, setSelected] = useState(options[0]);

  const searchParams = new URLSearchParams(useSearchParams().toString());
  const router = useRouter();

  function setCurrentQuery(query: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set(selectId, query);
      return router.replace(`?${params.toString()}`);
    }

    params.delete(selectId);
    router.replace(`?${params.toString()}`);
  }

  // TODO: TRUNCATE TEXT WHEN TOO LONG

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label className="whitespace-nowrap text-xs text-gray-100">
          {label}
        </label>
      )}

      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        multiple={multiple}
      >
        <div className="relative w-full">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border bg-gray-900 py-1.5 pr-8 pl-3 text-sm/6 border-gray-800 text-gray-600",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-800"
            )}
            displayValue={(id: string) =>
              options.find((opt) => opt.publicId === id)?.label ||
              options[0]?.label
            }
            onChange={(event) => setCurrentQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDown className="size-4 text-gray-400" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-(--input-width) rounded border border-gray-800 bg-gray-900 px-4 py-2 empty:invisible",
            "transition duration-100 ease-in data-leave:data-closed:opacity-0"
          )}
        >
          {options.map((option) => (
            <ComboboxOption
              key={option.publicId}
              value={option.publicId}
              className="group flex cursor-default items-center gap-2 rounded px-2.5 py-4 select-none data-focus:bg-neutral-alpha-weak"
            >
              <span className="text-gray-600">{option.label}</span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
