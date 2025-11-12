import type { ComponentProps, FormEvent } from "react";

import { useStore } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PasswordConfirmFieldGroup } from "@/features/auth/components/password-confirm-field-group";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/components/form/hook";
import { authClient } from "@/features/auth/client";

interface NewPasswordFormProperties extends ComponentProps<"form"> {
  showServerError: (errorMessage: string) => void;
  token: string;
}

function NewPasswordForm({
  showServerError,
  token,
  ...properties
}: NewPasswordFormProperties) {
  const router = useRouter();

  const newPasswordForm = useAppForm({
    onSubmit: async ({ value }) => {
      const { error } = await authClient.resetPassword({
        newPassword: value.password,
        token,
      });

      if (error) {
        showServerError(error.message ?? "Something went wrong.");
      } else {
        toast.success(
          "Your password has been updated successfully. Please use the new password to sign in."
        );
        router.push("/sign-in");
      }
    },
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const isSubmitting = useStore(
    newPasswordForm.store,
    (state) => state.isSubmitting
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await newPasswordForm.handleSubmit();
  }

  return (
    <form {...properties} onSubmit={(event) => void handleSubmit(event)}>
      <FieldSet>
        <FieldGroup>
          <PasswordConfirmFieldGroup
            fields={{
              confirmPassword: "confirmPassword",
              password: "password",
            }}
            confirmPasswordLabel="Confirm New Password"
            passwordLabel="New Password"
            disabled={isSubmitting}
            form={newPasswordForm}
          />
        </FieldGroup>
        <newPasswordForm.AppForm>
          <newPasswordForm.FormSubmitButton
            submittingText="Updating..."
            text="Update password"
          />
        </newPasswordForm.AppForm>
      </FieldSet>
    </form>
  );
}

export { NewPasswordForm };
