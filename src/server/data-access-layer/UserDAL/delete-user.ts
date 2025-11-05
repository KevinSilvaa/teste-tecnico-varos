"use server";

import { revalidateTag } from "next/cache";
import { prisma } from "../../../../prisma/prisma";

type DeleteUserActionProps = {
  publicId?: string;
};

export async function deleteUserAction({ publicId }: DeleteUserActionProps) {
  try {
    const userToDelete = await prisma.user.findUnique({
      where: {
        publicId,
      },
    });

    if (!userToDelete) {
      return {
        success: true,
        error: "User not found",
      };
    }

    await prisma.user.delete({
      where: {
        id: userToDelete.id,
      },
    });

    revalidateTag("customers", "layout");

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
