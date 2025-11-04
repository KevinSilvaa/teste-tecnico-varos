"use client";

import { SearchableSelect } from "@/app/_components/searchable-select";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { cn } from "@/utils/cn";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter, useSearchParams } from "next/navigation";

export function FormTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSetSelectedTab(tab: "basic-informations" | "add-customers") {
    const params = new URLSearchParams();
    params.set("tab", tab);

    router.replace(`?${params.toString()}`);
  }

  const currentTab = searchParams.get("tab") ?? "basic-informations";

  const stateOptions = [
    { label: "São Paulo", value: "sp" },
    { label: "Rio de Janeiro", value: "rj" },
    { label: "Minas Gerais", value: "mg" },
    { label: "Espírito Santo", value: "es" },
    { label: "Paraná", value: "pr" },
    { label: "Santa Catarina", value: "sc" },
    { label: "Rio Grande do Sul", value: "rs" },
    { label: "Distrito Federal", value: "df" },
    { label: "Goiás", value: "go" },
    { label: "Mato Grosso", value: "mt" },
    { label: "Mato Grosso do Sul", value: "ms" },
    { label: "Bahia", value: "ba" },
    { label: "Sergipe", value: "se" },
    { label: "Alagoas", value: "al" },
    { label: "Pernambuco", value: "pe" },
    { label: "Paraíba", value: "pb" },
    { label: "Rio Grande do Norte", value: "rn" },
    { label: "Ceará", value: "ce" },
    { label: "Piauí", value: "pi" },
    { label: "Maranhão", value: "ma" },
    { label: "Pará", value: "pa" },
    { label: "Amapá", value: "ap" },
    { label: "Roraima", value: "rr" },
    { label: "Amazonas", value: "am" },
    { label: "Acre", value: "ac" },
    { label: "Rondônia", value: "ro" },
    { label: "Tocantins", value: "to" },
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
          className={cn("py-1 px-2 text-gray-600 rounded", {
            "bg-gray-700": currentTab === "add-customers",
          })}
          value="add-customers"
        >
          Adicionar clientes
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="flex flex-col gap-6" value="basic-informations">
        <div className="grid grid-cols-2 gap-6">
          <Input
            id="age"
            name="age"
            label="Idade"
            type="number"
            placeholder="28 anos"
          />

          <Input
            id="cpf"
            name="cpf"
            label="CPF"
            placeholder="123.456.789-01"
            // mask="999.999.999-99"
            // stripValue
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            id="cep"
            name="cep"
            label="CEP"
            placeholder="12345-678"
            // mask="99999-999"
            // stripValue
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="userType" className="text-gray-600">
              Tipo do usuário
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
            selectId="addCustomers"
            options={customersOptions}
          />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
