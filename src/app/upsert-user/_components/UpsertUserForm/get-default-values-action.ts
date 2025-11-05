"use server";

import { UserDAL } from "@/server/data-access-layer/UserDAL";
import type { UpsertUserFormSchema } from "./upsert-user-form-schema";

export const getDefaultValuesAction = async (
  customerPublicId?: string
): Promise<UpsertUserFormSchema> => {
  if (!customerPublicId) {
    return {
      type: "CUSTOMER",
      name: "",
      phone: "",
      email: "",
      age: "",
      cpf: "",
      cep: "",
      state: "",
      address: "",
      complement: undefined,
    };
  }

  const getUserDataActionResponse = await UserDAL.getUserData({
    publicId: customerPublicId,
  });

  const userData = getUserDataActionResponse?.userData;

  if (userData) {
    return {
      address: userData.address ?? "",
      age: String(userData.age ?? ""),
      cep: userData.cep ?? "",
      cpf: userData.cpf ?? "",
      email: userData.email ?? "",
      name: userData.name ?? "",
      phone: userData.phone ?? "",
      state: userData.state ?? "",
      type: (userData.type as UpsertUserFormSchema["type"]) ?? "CUSTOMER",
      complement: userData.complement ?? undefined,
    };
  }

  return {
    type: "CUSTOMER",
    name: "",
    phone: "",
    email: "",
    age: "",
    cpf: "",
    cep: "",
    state: "",
    address: "",
    complement: undefined,
  };
};
