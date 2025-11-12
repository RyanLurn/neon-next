"use client";

import type { ComponentProps, FormEvent } from "react";
import type { Route } from "next";

import { useStore } from "@tanstack/react-form";

import { emailValidator } from "@/features/auth/validators";
import { useAppForm } from "@/components/form/hook";
import { authClient } from "@/features/auth/client";
import { FieldSet } from "@/components/ui/field";

interface ForgotPasswordFormProperties extends ComponentProps<"form"> {
  showServerSuccess: (successMessage: string) => void;
  showServerError: (errorMessage: string) => void;
}

function ForgotPasswordForm({
  showServerSuccess,
  showServerError,
  ...properties
}: ForgotPasswordFormProperties) {
  const forgotPasswordForm = useAppForm({
    onSubmit: async ({ value }) => {
      const { error, data } = await authClient.requestPasswordReset({
        redirectTo: "/new-password" as Route,
        email: value.email,
      });

      if (error) {
        showServerError(error.message ?? "Something went wrong.");
      } else {
        showServerSuccess(data.message);
      }
    },
    defaultValues: {
      email: "",
    },
  });

  const isSubmitting = useStore(
    forgotPasswordForm.store,
    (state) => state.isSubmitting
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await forgotPasswordForm.handleSubmit();
  }

  return (
    <form {...properties} onSubmit={(event) => void handleSubmit(event)}>
      <FieldSet>
        <forgotPasswordForm.AppField
          children={(field) => (
            <field.FormTextInputField
              description="The email address you used to create your account."
              placeholder="example@gmail.com"
              disabled={isSubmitting}
              label="Email"
              type="email"
              required
            />
          )}
          validators={{
            onChange: emailValidator,
          }}
          name="email"
        />
        <forgotPasswordForm.AppForm>
          <forgotPasswordForm.FormSubmitButton
            submittingText="Sending..."
            text="Confirm"
          />
        </forgotPasswordForm.AppForm>
      </FieldSet>
    </form>
  );
}

export { ForgotPasswordForm };
