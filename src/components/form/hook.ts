import { createFormHook } from "@tanstack/react-form";

import { FormTextInputField } from "@/components/form/fields/text-input";
import { fieldContext, formContext } from "@/components/form/context";

const { withFieldGroup, useAppForm, withForm } = createFormHook({
  fieldComponents: { FormTextInputField },
  formComponents: {},
  fieldContext,
  formContext,
});

export { withFieldGroup, useAppForm, withForm };
