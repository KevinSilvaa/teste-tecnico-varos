import * as PrimitiveSelect from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { cn } from "@/utils/cn";

import * as SelectPrimitive from "../ui/select";

type SelectProps<T> = PrimitiveSelect.SelectProps & {
  id: string;
  name: string;
  options: T[];
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  labelKey: keyof T;
  valueKey: keyof T;
  prefixKey?: keyof T;
};

export function Select<T>({
  name,
  id,
  options,
  label,
  placeholder,
  defaultValue,
  labelKey,
  valueKey,
  prefixKey,
  ...props
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          {label && (
            <label htmlFor={id} className="whitespace-nowrap text-gray-600">
              {label}
            </label>
          )}

          <SelectPrimitive.Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={defaultValue}
            open={open}
            onOpenChange={setOpen}
            {...props}
          >
            <SelectPrimitive.SelectTrigger
              id={id}
              className="bg-gray-900 border-gray-800 text-gray-600 h-10"
            >
              <SelectPrimitive.SelectValue
                placeholder={placeholder ?? "Selecione"}
                id={id}
                className="placeholder:text-gray-400"
              />

              {open ? (
                <ChevronUp className="size-4 text-gray-400" />
              ) : (
                <ChevronDown className="size-4 text-gray-400" />
              )}
            </SelectPrimitive.SelectTrigger>

            <SelectPrimitive.SelectContent className="bg-gray-900 py-2 px-4 max-h-52 overflow-y-auto">
              {options.map((item, index) => (
                <SelectPrimitive.SelectItem
                  key={index}
                  value={item[valueKey] as string}
                  defaultValue={defaultValue}
                  className={cn({
                    "bg-neutral-alpha-weak": item[valueKey] === field.value,
                  })}
                >
                  {item[labelKey] as string}{" "}
                  {prefixKey && `${item[prefixKey] as string}`}
                </SelectPrimitive.SelectItem>
              ))}
            </SelectPrimitive.SelectContent>
          </SelectPrimitive.Select>

          {!!error && (
            <span className="mt-0.5 text-xs text-red-600">{error.message}</span>
          )}
        </div>
      )}
    />
  );
}

// type MultiSelectProps<T> = SelectProps<T> & {
//   defaultValue?: { label: string; id: number }[]
// }

// export function MultiSelect<T>({
//   name,
//   id,
//   label,
//   placeholder,
//   valueKey,
//   labelKey,
//   ...props
// }: MultiSelectProps<T>) {
//   const { control } = useFormContext()

//   const { defaultValue, options, ...restProps } = props

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <div className="flex flex-col gap-2">
//           {label && (
//             <label
//               htmlFor={id}
//               className="whitespace-nowrap text-sm"
//             >
//               {label}
//             </label>
//           )}

//           <NextUISelect
//             {...field}
//             id={id}
//             isInvalid={!!error}
//             selectionMode="multiple"
//             classNames={{
//               mainWrapper: cn(
//                 'flex items-center w-full rounded-md border max-h-[53px] border-gray-100 focus-within:border-gray-300 active:border-brande',
//                 { 'border-error': !!error },
//               ),
//               trigger: 'bg-white h-full rounded-md border-none',
//               value: 'text-sm',
//               popoverContent: 'rounded-md',
//             }}
//             radius="md"
//             variant="bordered"
//             placeholder={placeholder}
//             size="lg"
//             renderValue={(items) => {
//               return items.map((item) => item['aria-label']).join(', ')
//             }}
//             {...restProps}
//           >
//             {options.map((option) => (
//               <NextUISelectItem
//                 value={option[valueKey] as number}
//                 aria-label={option[labelKey] as string}
//                 key={option[valueKey] as number}
//               >
//                 {option[labelKey] as string}
//               </NextUISelectItem>
//             ))}
//           </NextUISelect>

//           {!!error && (
//             <span className="text-xs text-error">{error.message}</span>
//           )}
//         </div>
//       )}
//     />
//   )
// }
