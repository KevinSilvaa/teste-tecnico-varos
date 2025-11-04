import { prisma } from "../../../prisma/prisma";
import { SearchableSelect } from "./searchable-select";

export async function TableFilters() {
  const consultorNameSelectId = "consultorName";
  const consultorEmailSelectId = "consultorEmail";

  const searchParams = new URLSearchParams();

  const consultorNameParam = searchParams.get(consultorNameSelectId) || "";
  const consultorEmailParam = searchParams.get(consultorEmailSelectId) || "";

  const consultorNameOptions = await prisma.user.findMany({
    where: {
      name: {
        contains: consultorNameParam ? consultorNameParam : undefined,
      },
    },
    select: {
      publicId: true,
      name: true,
    },
    take: 10,
  });

  // const consultorEmailOptions = await prisma.user.findMany({
  //   where: {
  //     email: {
  //       contains: consultorEmailParam ? consultorEmailParam : undefined,
  //     },
  //   },
  //   select: {
  //     publicId: true,
  //     email: true,
  //   },
  //   take: 10,
  // });

  const consultorEmailOptions = [
    {
      publicId: 'random-id-1',
      email: 'random-email-1@gmail.com',
    },
    {
      publicId: 'random-id-2',
      email: 'random-email-2@gmail.com',
    },
    {
      publicId: 'random-id-3',
      email: 'random-email-3@gmail.com',
    },
  ]

  return (
    <div className="flex items-center justify-center gap-6 py-4 px-6 border border-gray-800">
      <div className="flex items-center justify-center gap-2 text-gray-100">
        <SearchableSelect
          label="Nome do consultor"
          selectId={consultorNameSelectId}
          options={consultorNameOptions.map((option) => ({
            publicId: option.publicId,
            label: option.name,
          }))}
        />
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-100">
        <SearchableSelect
          label="Email do consultor"
          selectId={consultorEmailSelectId}
          options={consultorEmailOptions.map((option) => ({
            publicId: option.publicId,
            label: option.email,
          }))}
        />
      </div>

      {/* <DatePicker /> */}

      {/* <div className="flex items-center justify-center gap-2 text-gray-100">
        <span>Nome do consultor</span>
        <Select />
      </div> */}
    </div>
  );
}
