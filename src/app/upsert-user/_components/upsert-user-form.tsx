"use client";

import { FormProvider } from "@/components/form/form-provider";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@/components/form/select";
import { Input } from "@/components/form/input";
import { FormTabs } from "./form-tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { User, USER_TYPE } from "prisma/generated";
import { UserDAL } from "@/server/data-access-layer/UserDAL";

const upsertUserFormSchema = z.object({
  type: z.enum(["CUSTOMER", "CONSULTOR"], {
    error: "Selecione o tipo do usuário",
  }),
  name: z
    .string({ error: "O nome é obrigatório" })
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  phone: z
    .string({ error: "O telefone é obrigatório" })
    .min(11, "O telefone deve ser válido"),
  email: z.email({ error: "O email é obrigatório" }),
  age: z
    .string({ error: "A idade é obrigatória" })
    .min(1, "A idade deve ser válida"),
  cpf: z
    .string({ error: "O CPF é obrigatório" })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Digite um CPF válido"),
  cep: z
    .string({ error: "O CEP é obrigatório" })
    .regex(/^\d{5}-\d{3}$/, "Digite um CEP válido"),
  state: z
    .string({ error: "Selecione o estado" })
    .min(2, "Selecione um estado válido"),
  address: z
    .string({ error: "O endereço é obrigatório" })
    .min(3, "Digite um endereço válido"),
  complement: z.string().optional(),
});

export type UpsertUserFormSchema = z.infer<typeof upsertUserFormSchema>;

type UpsertUserFormProps = {
  customersOptions: User[];
};

export function UpsertUserForm({ customersOptions }: UpsertUserFormProps) {
  const searchParams = useSearchParams();
  const customerPublicId = searchParams.get("customerPublicId") ?? undefined;

  const customers = searchParams.get("addCustomers")?.split(", ");

  const methods = useForm<UpsertUserFormSchema>({
    resolver: zodResolver(upsertUserFormSchema),
    defaultValues: async () => {
      if (customerPublicId) {
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
            type: (userData.type as USER_TYPE) ?? "CUSTOMER",
            complement: userData.complement ?? undefined,
          };
        }
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
        customers: undefined,
      };
    },
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

        <FormTabs customersOptions={customersOptions} />
      </div>
    </FormProvider>
  );
}
