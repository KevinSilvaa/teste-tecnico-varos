"use server";

import { USER_TYPE } from "prisma/generated";
import { prisma } from "../../../prisma/prisma";
import type { UpsertUserFormSchema } from "./_components/upsert-user-form";

type UpsertUserActionProps = {
  data: UpsertUserFormSchema;
  publicId?: string;
};

export async function upsertUserAction({
  data,
  publicId,
}: UpsertUserActionProps) {
  try {
    const payload = {
      address: data.address,
      age: Number(data.age),
      cep: data.cep,
      cpf: data.cpf,
      email: data.email,
      name: data.name,
      phone: data.phone,
      state: data.state,
      type: data.type as USER_TYPE,
    };

    await prisma.user.upsert({
      where: {
        publicId: publicId ? publicId : "",
      },
      create: payload,
      update: publicId ? payload : {},
    });

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

type DeleteUserActionProps = {
  publicId?: string;
};

export async function deleteUserAction({ publicId }: DeleteUserActionProps) {
  try {
    await prisma.user.delete({
      where: {
        publicId,
      },
    });

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

type GetUserDataActionProps = {
  publicId: string;
};

export async function getUserDataAction({ publicId }: GetUserDataActionProps) {
  try {
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        publicId,
      },
    });

    if (!userData) {
      return undefined;
    }

    return {
      success: true,
      error: false,
      userData,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: error,
    };
  }
}
