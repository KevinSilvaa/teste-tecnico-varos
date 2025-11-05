"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import type { USER_TYPE } from "prisma/generated";

type CustomersTableRowProps = {
  customer: {
    publicId: string;
    type: USER_TYPE;
    name: string;
    email: string;
    phone: string;
    age: number;
    cpf: string;
    cep: string;
    state: string;
    address: string;
    complement: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export function CustomersTableRow({ customer }: CustomersTableRowProps) {
  const router = useRouter();

  return (
    <TableRow
      onClick={() =>
        router.push(`/upsert-user?customerPublicId=${customer.publicId}`)
      }
      key={customer.publicId}
      className="cursor-pointer"
    >
      <TableCell>{customer.name}</TableCell>
      <TableCell>{customer.email}</TableCell>
      <TableCell>{customer.phone}</TableCell>
      <TableCell>{customer.cpf}</TableCell>
      <TableCell>{customer.age}</TableCell>
      <TableCell>{customer.address}</TableCell>
      <TableCell>
        {dayjs(customer.createdAt).format("DD/MM/YYYY [às] HH:mm[h]")}
      </TableCell>
      <TableCell>
        {dayjs(customer.updatedAt).format("DD/MM/YYYY [às] HH:mm[h]")}
      </TableCell>
    </TableRow>
  );
}
