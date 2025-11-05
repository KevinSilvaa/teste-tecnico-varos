"use server";

import type { USER_TYPE } from "prisma/generated";
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
    const userPayload = buildUserPayload(data);
    const isConsultor = data.type === "CONSULTOR";
    const hasCustomers = data.customers?.length > 0;

    await prisma.user.upsert({
      where: { publicId: publicId ?? "" },
      create: buildCreatePayload(
        userPayload,
        isConsultor,
        hasCustomers,
        data.customers
      ),
      update: buildUpdatePayload(
        userPayload,
        isConsultor,
        hasCustomers,
        data.customers
      ),
    });

    updateTag("customers");

    return { success: true, error: null };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

function buildUserPayload(data: UpsertUserActionProps["data"]) {
  return {
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
}

function buildCreatePayload(
  userPayload: ReturnType<typeof buildUserPayload>,
  isConsultor: boolean,
  hasCustomers: boolean,
  customerIds?: string[]
) {
  if (!isConsultor || !hasCustomers || !customerIds) {
    return userPayload;
  }

  return {
    ...userPayload,
    customers: {
      create: customerIds.map((customerPublicId) => ({
        customer: { connect: { publicId: customerPublicId } },
      })),
    },
  };
}

function buildUpdatePayload(
  userPayload: ReturnType<typeof buildUserPayload>,
  isConsultor: boolean,
  hasCustomers: boolean,
  customerIds?: string[]
) {
  if (!isConsultor || !hasCustomers || !customerIds) {
    return userPayload;
  }

  return {
    ...userPayload,
    customers: {
      deleteMany: {},
      create: customerIds.map((customerPublicId) => ({
        customer: { connect: { publicId: customerPublicId } },
      })),
    },
  };
}
