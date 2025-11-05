"use client";

import { FormProvider } from "@/components/form/form-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@/components/form/select";
import { Input } from "@/components/form/input";
import { FormTabs } from "../form-tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { USER_TYPE } from "prisma/generated";
import { UserDAL } from "@/server/data-access-layer/UserDAL";
import {
  upsertUserFormSchema,
  UpsertUserFormSchema,
} from "./upsert-user-form-schema";
import { getDefaultValuesAction } from "./get-default-values-action";

export function UpsertUserForm({
  userThatIsBeingEdited,
  customersOptions,
}: UpsertUserFormProps) {
  const searchParams = useSearchParams();
  const customerPublicId = searchParams.get("customerPublicId") ?? undefined;

  const customers = searchParams.get("addCustomers")?.split(", ");

  const methods = useForm<UpsertUserFormSchema>({
    resolver: zodResolver(upsertUserFormSchema),
    defaultValues: async () => await getDefaultValuesAction(customerPublicId),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const router = useRouter();

  async function handleUpsertUserFormSubmit(data: UpsertUserFormSchema) {
    const upsertActionResponse = await UserDAL.upsertUser({
      data: {
        ...data,
        customers: customers ?? [],
      },
      publicId: customerPublicId,
    });

    if (upsertActionResponse.success) {
      toast.success("Sucesso!", {
        description: "Suas alteracoes foram feitas com sucesso.",
      });

      router.push("/");
    } else {
      toast.error("Erro!", {
        description: "Houve um erro ao tentar fazer alteracoes.",
      });
    }
  }

  async function handleDeleteUser() {
    const deleteUserActionResponse = await UserDAL.deleteUser({
      publicId: customerPublicId,
    });

    if (deleteUserActionResponse.success) {
      toast.success("Sucesso!", {
        description: "Suas alteracoes foram feitas com sucesso.",
      });

      router.push("/");
    } else {
      toast.error("Erro!", {
        description: "Houve um erro ao tentar fazer alteracoes.",
      });
    }
  }

  const userOptions = [
    { label: "Customer", value: "CUSTOMER" },
    { label: "Consultor", value: "CONSULTOR" },
  ];

  const userThatIsBeingEditedCustomers = userThatIsBeingEdited?.customers.map(
    (customer) => customer.customer.publicId
  );

  return (
    <FormProvider
      onSubmit={handleSubmit(handleUpsertUserFormSubmit)}
      methods={methods}
      className="py-20 px-32 flex flex-col max-w-4xl mx-auto gap-6"
    >
      <div className="flex items-center w-full border-b border-gray-800 justify-end gap-2.5 px-2.5 py-4">
        <Button disabled={isSubmitting} type="submit">
          {customerPublicId ? "Editar usuário" : "Criar usuário"}
        </Button>
        <Button
          disabled={!customerPublicId}
          variant="secondary"
          type="button"
          onClick={handleDeleteUser}
        >
          Deletar usuário
        </Button>
      </div>

      <div className="max-w-xl mx-auto w-full flex flex-col gap-6">
        <h1 className="font-semibold text-doctor text-xl">Criar usuário</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="text-gray-600">
            Tipo do usuário
          </label>

          <Select
            id="type"
            name="type"
            labelKey="label"
            valueKey="value"
            options={userOptions}
          />
        </div>

        <div className="grid grid-cols-2 items-start gap-6">
          <Input
            id="name"
            name="name"
            label="Nome"
            placeholder="Digite o nome"
          />

          <Input
            id="phone"
            name="phone"
            label="Telefone"
            placeholder="Digite o telefone"
            mask="(00) 00000-0000"
          />
        </div>

        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="Digite o email"
        />

        <FormTabs userThatIsBeingEditedCustomers={userThatIsBeingEditedCustomers} customersOptions={customersOptions} />
      </div>
    </FormProvider>
  );
}

type UpsertUserFormProps = {
  userThatIsBeingEdited: {
    customers: {
      customer: {
        publicId: string;
      };
    }[];
  } | null;
  customersOptions: {
    publicId: string;
    type: USER_TYPE;
    name: string;
    email: string;
    phone: string;
    age: number;
    cpf: string;
    cep: string;
    state: string;
    address: string;
    complement: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
