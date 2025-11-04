import { ArrowUpRight } from "lucide-react";

export function CustomersCard() {
  // TODO: GET CUSTOMERS FROM DB
  
  return (
    <div className="bg-gray-900 text-gray-400 border border-gray-800 rounded-md text-sm flex flex-col gap-2 p-4 w-56">
      <span>Total de clientes</span>

      <div className="flex items-center gap-1">
        <strong className="text-[38px] text-white">128</strong>
        <ArrowUpRight className="size-6 text-s-green" />
      </div>

      <span>nos últimos 7 dias</span>
    </div>
  )
}