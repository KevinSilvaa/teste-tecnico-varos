"use server";

import { updateTag } from "next/cache";
import { prisma } from "../../../../prisma/prisma";

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
