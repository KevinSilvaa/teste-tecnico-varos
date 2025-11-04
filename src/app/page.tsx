import { Suspense } from "react";
import { prisma } from "../../prisma/prisma";
import { CustomersCard } from "./_components/customers-card";
import { CustomersTable } from "./_components/customers-table";
import { TableActions } from "./_components/table-actions";
import { Skeleton } from "@/components/ui/skeleton";
import type { Prisma } from "prisma/generated";

type DashboardPageProps = {
  searchParams: Promise<{
    consultorName: string;
    consultorEmail: string;
    startDate: string;
    endDate: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { consultorName, consultorEmail, startDate, endDate } =
    await searchParams;

  return (
    <div className="py-20 px-32 mx-auto flex flex-col gap-6">
      <DashboardContentSuspensed
        consultorName={consultorName}
        consultorEmail={consultorEmail}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

type DashobardContentSuspensedProps = {
  consultorName: string;
  consultorEmail: string;
  startDate: string;
  endDate: string;
};

export async function DashboardContentSuspensed({
  consultorName,
  consultorEmail,
  startDate,
  endDate,
}: DashobardContentSuspensedProps) {
  return (
    <Suspense fallback={<DashboardContentSuspensed.Skeleton />}>
      <DashboardContentAsync
        consultorName={consultorName}
        consultorEmail={consultorEmail}
        startDate={startDate}
        endDate={endDate}
      />
    </Suspense>
  );
}

DashboardContentSuspensed.Skeleton =
  function DashboardContentSuspendedSkeleton() {
    return (
      <>
        <Skeleton className="bg-gray-800 h-12 w-56" />

        <div className="flex items-center justify-between">
          <CustomersCard.Skeleton />

          <TableActions.Skeleton />
        </div>

        <CustomersTable.Skeleton />
      </>
    );
  };

type DashboardContentAsyncProps = {
  consultorName: string;
  consultorEmail: string;
  startDate: string;
  endDate: string;
};

export async function DashboardContentAsync({
  consultorName,
  consultorEmail,
  startDate,
  endDate,
}: DashboardContentAsyncProps) {
  // TODO: USE START DATE AND END DATE

  const customersWhere: Prisma.UserWhereInput = {
    type: "CUSTOMER",
    UserOnConsultor: {
      every: {
        consultor: {
          name: consultorName
            ? {
                contains: consultorName,
                mode: "insensitive",
              }
            : undefined,
          email: consultorEmail
            ? {
                contains: consultorEmail,
                mode: "insensitive",
              }
            : undefined,
        },
      },
    },
  };

  const customers = await prisma.user.findMany({
    where: customersWhere,
    take: 10,
  });

  const costumersCount = await prisma.user.count({
    where: customersWhere,
  })

  return (
    <>
      <h1 className="text-doctor font-bold text-[32px]">Dashboard</h1>

      <div className="flex items-center justify-between">
        <CustomersCard costumersCount={costumersCount} />

        <TableActions />
      </div>

      <CustomersTable customers={customers} />
    </>
  );
}
