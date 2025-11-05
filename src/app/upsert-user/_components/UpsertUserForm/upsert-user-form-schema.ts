import z from "zod";

export const upsertUserFormSchema = z.object({
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
