"use client";

import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import dayjs from "dayjs";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type DateRangePickerProps = {
  label?: string;
};

export function DateRangePicker({ label }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSelectDate() {
    const params = new URLSearchParams(searchParams.toString());

    if (dateRange?.from && dateRange?.to) {
      params.set("startDate", dateRange.from.toLocaleDateString());

      params.set("endDate", dateRange.to.toLocaleDateString());
    } else {
      params.delete("startDate");
      params.delete("endDate");
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

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="max-h-10">
          <Button
            variant="outline"
            className="w-54 rounded-lg py-2.5 px-4 text-sm border-gray-800 text-gray-600 border bg-gray-900 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-gray-800"
          >
            {dateRange
              ? `${dayjs(dateRange.from).format("DD/MM/YYYY")} até ${dayjs(
                  dateRange.to
                ).format("DD/MM/YYYY")}`
              : "Selecione uma data"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto outline-hidden p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            onDayFocus={handleSelectDate}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
