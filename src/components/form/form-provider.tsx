import { type HTMLAttributes, ReactNode } from 'react'
import {
  type FieldValues,
  FormProvider as Form,
  UseFormReturn,
} from 'react-hook-form'

type FormProviderProps<T extends FieldValues> = {
  children: ReactNode
  methods: UseFormReturn<T>
  onSubmit?: () => void
  id?: string
} & HTMLAttributes<HTMLFormElement>

export function FormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
  id,
  className,
  ...props
}: FormProviderProps<T>) {
  return (
    <Form {...methods}>
      <form
        onSubmit={onSubmit}
        id={id}
        className={className}
        {...props}
      >
        {children}
      </form>
    </Form>
  )
}
