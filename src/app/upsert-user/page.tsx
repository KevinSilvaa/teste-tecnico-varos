import { Suspense } from "react";
import { prisma } from "../../../prisma/prisma";
import { UpsertUserForm } from "./_components/UpsertUserForm/upsert-user-form";

type UpsertUserPageProps = {
  searchParams: Promise<{
    customerPublicId: string;
  }>;
};

export default async function UpsertUserPage({
  searchParams,
}: UpsertUserPageProps) {
  const { customerPublicId } = await searchParams;

  const customersOptions = await prisma.user.findMany({
    where: {
      type: "CUSTOMER",
      UserOnConsultor: customerPublicId
        ? {
            none: {
              consultor: {
                publicId: customerPublicId,
              },
            },
          }
        : undefined,
    },
  });

  return (
    <Suspense>
      <UpsertUserForm customersOptions={customersOptions} />
    </Suspense>
  );
}
