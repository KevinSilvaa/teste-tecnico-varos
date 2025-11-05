import { Suspense } from "react";
import { prisma } from "../../prisma/prisma";
import { CustomersCard } from "./_components/customers-card";
import { CustomersTable } from "./_components/customers-table";
import { TableActions } from "./_components/table-actions";
import { Skeleton } from "@/components/ui/skeleton";
import type { Prisma } from "prisma/generated";
import { unstable_cache } from "next/cache";

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
  const start =
    startDate && !isNaN(new Date(startDate).getTime())
      ? new Date(startDate)
      : undefined;

  const end =
    endDate && !isNaN(new Date(endDate).getTime())
      ? new Date(endDate)
      : undefined;

  const customersWhere: Prisma.UserWhereInput = {
    createdAt:
      start && end
        ? { gte: start, lte: end }
        : start
        ? { gte: start }
        : end
        ? { lte: end }
        : undefined,
    UserOnConsultor:
      consultorName || consultorEmail
        ? {
            some: {
              consultor: {
                OR: [
                  consultorName
                    ? {
                        name: {
                          contains: consultorName,
                          mode: "insensitive",
                        },
                      }
                    : {},
                  consultorEmail
                    ? {
                        email: {
                          contains: consultorEmail,
                          mode: "insensitive",
                        },
                      }
                    : {},
                ],
              },
            },
          }
        : undefined,
  };

  const getCachedCustomers = unstable_cache(
    async () => {
      const customers = await prisma.user.findMany({
        where: customersWhere,
        select: {
          address: true,
          age: true,
          cep: true,
          complement: true,
          cpf: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          name: true,
          phone: true,
          publicId: true,
          state: true,
          type: true,
        },
        take: 10,
      });

      return { customers: customers };
    },
    ["customers"],
    {
      tags: ["customers"],
      revalidate: 3600,
    }
  );

  const { customers } = await getCachedCustomers();

  const customersCount = await prisma.user.count({
    where: customersWhere,
  });

  return (
    <>
      <h1 className="text-doctor font-bold text-[32px]">Dashboard</h1>

      <div className="flex items-center justify-between">
        <CustomersCard
          customersCount={customersCount}
          startDate={startDate}
          endDate={endDate}
        />

        <TableActions />
      </div>

      <CustomersTable customers={customers} />
    </>
  );
}
