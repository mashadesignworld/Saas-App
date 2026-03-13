"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

export const Form = FormProvider

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`space-y-2 ${className || ""}`} {...props} />
}

export function FormLabel(
  props: React.LabelHTMLAttributes<HTMLLabelElement>
) {
  return <label className="text-sm font-medium" {...props} />
}

export function FormControl({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

export function FormMessage() {
  const { formState } = useFormContext()
  const error = Object.values(formState.errors)[0]

  if (!error) return null

  return (
    <p className="text-sm text-red-500">
      {String(error?.message)}
    </p>
  )
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  return <Controller {...props} />
}