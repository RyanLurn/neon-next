import type { HTMLInputTypeAttribute } from "react";

import {
  FieldDescription,
  FieldLabel,
  FieldError,
  Field,
} from "@/components/ui/field";
import { useFieldContext } from "@/components/form/context";
import { Input } from "@/components/ui/input";

function FormTextInputField({
  placeholder,
  description,
  required,
  disabled,
  label,
  type,
}: {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  label: string;
}) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        onChange={(event) => field.handleChange(event.target.value)}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        required={required}
        disabled={disabled}
        name={field.name}
        id={field.name}
        type={type}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export { FormTextInputField };
