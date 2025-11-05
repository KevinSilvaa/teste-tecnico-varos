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
    },
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
  });

  const userThatIsBeingEdited = await prisma.user.findUnique({
    where: {
      type: "CONSULTOR",
      publicId: customerPublicId,
    },
    select: {
      customers: {
        select: {
          customer: {
            select: {
              publicId: true,
            },
          },
        },
      },
    },
  });

  return (
    <Suspense>
      <UpsertUserForm userThatIsBeingEdited={userThatIsBeingEdited} customersOptions={customersOptions} />
    </Suspense>
  );
}
