import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomersTableRow } from "./customers-table-row";
import type { USER_TYPE } from "prisma/generated";

type CustomersTableProps = {
  customers: {
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
  }[];
};

export function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-c-black">
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Cpf</TableHead>
          <TableHead>Idade</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Atualizado em</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers.map((customer) => (
          <CustomersTableRow key={customer.publicId} customer={customer} />
        ))}
      </TableBody>
    </Table>
  );
}

function CustomersTableRowSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="h-5 w-20 bg-gray-800" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-28 bg-gray-800" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-24 bg-gray-800" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-24 bg-gray-800" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-4 bg-gray-800" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-16 bg-gray-800" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-20 bg-gray-800" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-36 bg-gray-800" />
      </TableCell>
    </TableRow>
  ));
}

CustomersTable.Skeleton = function CustomersTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-c-black">
          <TableHead>
            <Skeleton className="h-5 w-12 bg-gray-800" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-12 bg-gray-800" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-24 bg-gray-800" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-8 bg-gray-800" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-16 bg-gray-800" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-24 bg-gray-800" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-24 bg-gray-800" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-24 bg-gray-800" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <CustomersTableRowSkeleton />
      </TableBody>
    </Table>
  );
};
