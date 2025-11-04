"use client";

import { FormProvider } from "@/components/form/form-provider";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@/components/form/select";
import { Input } from "@/components/form/input";
import { FormTabs } from "./form-tabs";

const upsertUserFormSchema = z.object({});

type UpsertUserFormSchema = z.infer<typeof upsertUserFormSchema>;

export function UpsertUserForm() {
  const methods = useForm<UpsertUserFormSchema>({
    resolver: zodResolver(upsertUserFormSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isSubmitSuccessful },
  } = methods;

  async function handleUpsertUserFormSubmit(data: UpsertUserFormSchema) {
    console.log(data);
  }

  const userOptions = [
    { label: "Customer", value: "customer" },
    { label: "Consultor", value: "consultor" },
  ];

  return (
    <FormProvider
      onSubmit={handleSubmit(handleUpsertUserFormSubmit)}
      methods={methods}
      className="max-w-xl mx-auto w-full flex flex-col gap-6"
    >
      <h1 className="font-semibold text-doctor text-xl">Criar usuário</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="userType" className="text-gray-600">
          Tipo do usuário
        </label>
        
        <Select
          id="userType"
          name="userType"
          labelKey="label"
          valueKey="value"
          options={userOptions}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input id="name" name="name" label="Nome" placeholder="Digite o nome" />

        <Input
          id="phone"
          name="phone"
          label="Telefone"
          placeholder="Digite o telefone"
          // mask="(99) 99999-9999"
          // stripValue
        />
      </div>

      <Input
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="Digite o email"
      />

      <FormTabs />
    </FormProvider>
  );
}
