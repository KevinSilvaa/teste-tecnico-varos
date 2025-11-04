import { Plus } from "lucide-react";
import Link from "next/link";
import { TableFilters } from "./table-filters";
import { Button } from "@/components/ui/button";

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
  )
}