"use server";

import type { Prisma, USER_TYPE } from "prisma/generated";
import { prisma } from "../../../../prisma/prisma";
import { updateTag } from "next/cache";
import { UpsertUserFormSchema } from "@/app/upsert-user/_components/UpsertUserForm/upsert-user-form-schema";

type UpsertUserActionProps = {
  data: UpsertUserFormSchema & {
    customers: string[];
  };
  publicId?: string;
};

export async function upsertUserAction({
  data,
  publicId,
}: UpsertUserActionProps) {
  try {
    const basePayload: Prisma.UserUncheckedCreateInput = {
      address: data.address,
      age: Number(data.age),
      cep: data.cep,
      cpf: data.cpf,
      email: data.email,
      name: data.name,
      phone: data.phone,
      state: data.state,
      type: data.type as USER_TYPE,
      complement: data.complement ?? null,
    };

    const user = await prisma.user.upsert({
      where: {
        publicId: publicId ?? "",
      },
      create: basePayload,
      update: basePayload,
      select: { id: true, type: true },
    });

    if (user.type === "CONSULTOR" && data.customers?.length) {
      const customers = await prisma.user.findMany({
        where: {
          publicId: { in: data.customers },
        },
        select: { id: true },
      });

      await prisma.userOnConsultor.createMany({
        data: customers.map((c: { id: number }) => ({
          consultorId: user.id,
          customerId: c.id,
        })),
      });
    }

    updateTag("customers");

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: error,
    };
  }
}
