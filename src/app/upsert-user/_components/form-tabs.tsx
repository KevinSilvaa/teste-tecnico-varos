"use client";

import { Input } from "@/components/form/input";
import { SearchableSelect } from "@/components/form/searchable-select";
import { Select } from "@/components/form/select";
import { cn } from "@/utils/cn";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter, useSearchParams } from "next/navigation";
import type { User } from "prisma/generated";

type FormTabsProps = {
  customer?: User;
};

export function FormTabs({ customer }: FormTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSetSelectedTab(tab: "basic-informations" | "add-customers") {
    const params = new URLSearchParams();
    params.set("tab", tab);

    router.replace(`?${params.toString()}`);
  }

  const currentTab = searchParams.get("tab") ?? "basic-informations";

  const stateOptions = [
    { label: "São Paulo", value: "SP" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Paraná", value: "PR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Goiás", value: "GO" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Bahia", value: "BA" },
    { label: "Sergipe", value: "SE" },
    { label: "Alagoas", value: "AL" },
    { label: "Pernambuco", value: "PE" },
    { label: "Paraíba", value: "PB" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Ceará", value: "CE" },
    { label: "Piauí", value: "PI" },
    { label: "Maranhão", value: "MA" },
    { label: "Pará", value: "PA" },
    { label: "Amapá", value: "AP" },
    { label: "Roraima", value: "RR" },
    { label: "Amazonas", value: "AM" },
    { label: "Acre", value: "AC" },
    { label: "Rondônia", value: "RO" },
    { label: "Tocantins", value: "TO" },
  ];

  const customersOptions = [
    {
      label: "Kevin Azevedo da Silva",
      publicId: "some-random-public-id-1",
    },
    {
      label: "Joao Azevedo da Silva",
      publicId: "some-random-public-id-2",
    },
    {
      label: "Bia Azevedo da Silva",
      publicId: "some-random-public-id-3",
    },
    {
      label: "Samara Azevedo da Silva",
      publicId: "some-random-public-id-4",
    },
    {
      label: "Rebeca Azevedo da Silva",
      publicId: "some-random-public-id-5",
    },
  ];

  return (
    <Tabs.Root
      className="flex flex-col gap-6"
      defaultValue={currentTab}
      onValueChange={(tab) =>
        handleSetSelectedTab(tab as "basic-informations" | "add-customers")
      }
    >
      <Tabs.List
        className="border-b border-gray-800 py-4 px-2"
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className={cn("py-1 px-2 text-gray-600 rounded", {
            "bg-gray-700": currentTab === "basic-informations",
          })}
          value="basic-informations"
        >
          Informações básica
        </Tabs.Trigger>

        <Tabs.Trigger
          className={cn(
            "py-1 px-2 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed",
            {
              "bg-gray-700": currentTab === "add-customers",
            }
          )}
          value="add-customers"
          disabled={customer?.type === "CUSTOMER" || !customer}
        >
          Adicionar clientes
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="flex flex-col gap-6" value="basic-informations">
        <div className="grid grid-cols-2 items-start gap-6">
          <Input id="age" name="age" label="Idade" placeholder="28 anos" />

          <Input
            id="cpf"
            name="cpf"
            label="CPF"
            placeholder="123.456.789-01"
            mask="000.000.000-00"
          />
        </div>

        <div className="grid grid-cols-2 items-start gap-6">
          <Input
            id="cep"
            name="cep"
            label="CEP"
            placeholder="12345-678"
            mask="00000-000"
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="userType" className="text-gray-600">
              Estado
            </label>

            <Select
              id="state"
              name="state"
              labelKey="label"
              valueKey="value"
              options={stateOptions}
            />
          </div>
        </div>

        <Input
          id="address"
          name="address"
          label="Endereço"
          placeholder="Digite seu endereço"
        />

        <Input
          id="complement"
          name="complement"
          label="Complemento"
          placeholder="Digite seu complemento"
        />
      </Tabs.Content>

      <Tabs.Content className="flex flex-col gap-6" value="add-customers">
        <div className="flex flex-col gap-2">
          <label htmlFor="userType" className="text-gray-600">
            Clientes
          </label>

          {/* TODO: FIX THIS SELECT FLOW */}

          <SearchableSelect
            name="customers"
            selectId="addCustomers"
            multiple
            options={customersOptions}
          />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
