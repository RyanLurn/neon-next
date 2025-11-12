import { createFormHookContexts } from "@tanstack/react-form";

const { useFieldContext, useFormContext, fieldContext, formContext } =
  createFormHookContexts();

export { useFieldContext, useFormContext, fieldContext, formContext };
