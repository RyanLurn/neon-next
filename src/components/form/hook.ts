import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "@/components/form/context";

const { withFieldGroup, useAppForm, withForm } = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext,
});

export { withFieldGroup, useAppForm, withForm };
