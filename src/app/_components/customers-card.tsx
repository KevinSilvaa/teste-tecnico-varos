import { Skeleton } from "@/components/ui/skeleton";
import { getDaysBetweenDates } from "@/utils/functions/get-days-between-dates";
import { ArrowUpRight } from "lucide-react";

type CustomersCardProps = {
  customersCount: number;
  startDate: string;
  endDate: string;
};

export function CustomersCard({
  customersCount,
  startDate,
  endDate,
}: CustomersCardProps) {
  return (
    <div className="bg-gray-900 text-gray-400 border border-gray-800 rounded-md text-sm flex flex-col gap-2 p-4 w-56">
      <span>Total de clientes</span>

      <div className="flex items-center gap-1">
        <strong className="text-[38px] text-white">{customersCount}</strong>
        <ArrowUpRight className="size-6 text-s-green" />
      </div>

      <span>
        nos últimos{" "}
        {!(startDate || endDate)
          ? "7"
          : getDaysBetweenDates(new Date(startDate), new Date(endDate))}{" "}
        dias
      </span>
    </div>
  );
}

CustomersCard.Skeleton = function CustomersCardSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-md flex flex-col gap-2 p-4 w-56">
      <Skeleton className="bg-gray-800 w-32 h-5" />

      <Skeleton className="w-20 h-14 bg-gray-800" />

      <Skeleton className="w-36 h-5 bg-gray-800" />
    </div>
  );
};
