import { CustomersCard } from "./_components/customers-card";
import { TableActions } from "./_components/table-actions";

export default function Dashboard() {
  return (
    <div className="py-20 px-32 mx-auto flex flex-col gap-6">
      <h1 className="text-doctor font-bold text-[32px]">Dashboard</h1>

      <div className="flex items-center justify-between">
        <CustomersCard />

        <TableActions />
      </div>
    </div>
  )
}
