import { DateRangePicker } from "@/components/ui/date-range-picker";
import { prisma } from "../../../prisma/prisma";
import { SearchableSelect } from "./searchable-select";
import { Skeleton } from "@/components/ui/skeleton";

export async function TableFilters() {
  const consultorNameSelectId = "consultorName";
  const consultorEmailSelectId = "consultorEmail";

  const searchParams = new URLSearchParams();

  const consultorNameParam = searchParams.get(consultorNameSelectId) || "";
  const consultorEmailParam = searchParams.get(consultorEmailSelectId) || "";

  const consultorNameOptions = await prisma.user.findMany({
    where: {
      type: "CONSULTOR",
      name: {
        contains: consultorNameParam ? consultorNameParam : undefined,
      },
    },
    select: {
      publicId: true,
      name: true,
    },
    take: 10,
  });

  const consultorEmailOptions = await prisma.user.findMany({
    where: {
      type: "CONSULTOR",
      email: {
        contains: consultorEmailParam ? consultorEmailParam : undefined,
      },
    },
    select: {
      publicId: true,
      email: true,
    },
    take: 10,
  });

  return (
    <div className="flex items-center justify-center gap-6 py-4 px-6 border border-gray-800">
      <div className="flex items-center justify-center gap-2 text-gray-100">
        <SearchableSelect
          label="Nome do consultor"
          selectId={consultorNameSelectId}
          options={consultorNameOptions.map(
            (option: { publicId: string; name: string }) => ({
              publicId: option.publicId,
              label: option.name,
            })
          )}
        />
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-100">
        <SearchableSelect
          label="Email do consultor"
          selectId={consultorEmailSelectId}
          options={consultorEmailOptions.map(
            (option: { publicId: string; email: string }) => ({
              publicId: option.publicId,
              label: option.email,
            })
          )}
        />
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-100">
        <DateRangePicker label="Período" />
      </div>
    </div>
  );
}

TableFilters.Skeleton = function TableFiltersSkeleton() {
  return (
    <div className="flex items-center justify-center gap-6 py-4 px-6 border border-gray-800">
      <div className="flex items-center justify-center gap-2 text-gray-100">
        <Skeleton className="h-4 w-24 bg-gray-800" />
        <Skeleton className="h-10 w-44" />
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-100">
        <Skeleton className="h-4 w-24 bg-gray-800" />
        <Skeleton className="h-10 w-44" />
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-100">
        <Skeleton className="h-4 w-24 bg-gray-800" />
        <Skeleton className="h-10 w-52" />
      </div>
    </div>
  );
};
