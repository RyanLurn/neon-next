import { createFormHook } from "@tanstack/react-form";

import { FormTextInputField } from "@/components/form/fields/text-input";
import { fieldContext, formContext } from "@/components/form/context";
import { FormSubmitButton } from "@/components/form/submit-button";

const { withFieldGroup, useAppForm, withForm } = createFormHook({
  fieldComponents: { FormTextInputField },
  formComponents: { FormSubmitButton },
  fieldContext,
  formContext,
});

export { withFieldGroup, useAppForm, withForm };
