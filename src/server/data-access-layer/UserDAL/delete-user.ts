"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "../../../../prisma/prisma";

type DeleteUserActionProps = {
  publicId?: string;
};

export async function deleteUserAction({ publicId }: DeleteUserActionProps) {
  try {
    if (!publicId) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    await prisma.user.delete({
      where: {
        publicId,
      },
    });

    revalidateTag("customers", "max");
    revalidatePath("/", "layout");

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
