import { Plus } from "lucide-react";
import Link from "next/link";
import { TableFilters } from "./table-filters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function TableActions() {
  return (
    <div className="flex flex-col gap-2">
      <Button className="self-end w-fit" asChild>
        <Link href="/upsert-user">
          <span>Criar usuário</span>
          <Plus className="size-6" />
        </Link>
      </Button>

      <TableFilters />
    </div>
  );
}

TableActions.Skeleton = function TableActionsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="bg-gray-800 h-14 w-40 self-end" />

      <TableFilters.Skeleton />
    </div>
  );
};
