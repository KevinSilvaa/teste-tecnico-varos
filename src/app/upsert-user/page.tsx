import { Button } from "@/components/ui/button";
import { UpsertUserForm } from "./_components/upsert-user-form";

export default function UpsertUserPage() {
  return (
    <div className="py-20 px-32 flex flex-col max-w-4xl mx-auto gap-6">
      <div className="flex items-center w-full border-b border-gray-800 justify-end gap-2.5 px-2.5 py-4">
        <Button>Criar usuário</Button>
        <Button variant="secondary">Deletar usuário</Button>
      </div>

      <UpsertUserForm />
    </div>
  );
}
