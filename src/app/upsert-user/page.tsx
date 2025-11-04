import { prisma } from "../../../prisma/prisma";
import { UpsertUserForm } from "./_components/upsert-user-form";

export default async function UpsertUserPage() {
  const customersOptions = await prisma.user.findMany({
    where: {
      type: "CUSTOMER",
    },
  });

  return <UpsertUserForm customersOptions={customersOptions} />;
}
