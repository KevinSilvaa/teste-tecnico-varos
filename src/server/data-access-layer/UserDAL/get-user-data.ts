"use server";

import { prisma } from "../../../../prisma/prisma";

type GetUserDataActionProps = {
  publicId: string;
};

export async function getUserDataAction({ publicId }: GetUserDataActionProps) {
  try {
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        publicId,
      },
      include: {
        customers: {
          select: {
            customer: {
              select: {
                name: true,
                publicId: true,
              },
            },
          },
        },
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
