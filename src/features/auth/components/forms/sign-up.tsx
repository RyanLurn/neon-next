import type { ComponentProps, FormEvent } from "react";
import type { Route } from "next";

import { useStore } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { PasswordConfirmFieldGroup } from "@/features/auth/components/password-confirm-field-group";
import {
  FieldDescription,
  FieldGroup,
  FieldSet,
  Field,
} from "@/components/ui/field";
import { emailValidator, nameValidator } from "@/features/auth/validators";
import { useAppForm } from "@/components/form/hook";
import { authClient } from "@/features/auth/client";

interface SignUpFormProperties extends ComponentProps<"form"> {
  showServerError: (errorMessage: string) => void;
}

function SignUpForm({ showServerError, ...properties }: SignUpFormProperties) {
  const router = useRouter();
  const signUpForm = useAppForm({
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signUp.email({
        ...value,
        callbackURL: "/protected" as Route, // redirect url after email verification
      });

      if (error) {
        showServerError(error.message ?? "Something went wrong.");
      } else {
        router.push(
          `/sign-up/verify-email?email=${encodeURIComponent(value.email)}`
        );
      }
    },
    defaultValues: {
      confirmPassword: "",
      password: "",
      email: "",
      name: "",
    },
  });
  const isSubmitting = useStore(
    signUpForm.store,
    (state) => state.isSubmitting
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await signUpForm.handleSubmit();
  }

  return (
    <form {...properties} onSubmit={(event) => void handleSubmit(event)}>
      <FieldSet>
        <FieldGroup>
          <signUpForm.AppField
            children={(field) => (
              <field.FormTextInputField
                placeholder="Anders Hejlsberg"
                disabled={isSubmitting}
                label="Full Name"
                type="text"
                required
              />
            )}
            validators={{
              onChange: nameValidator,
            }}
            name="name"
          />
          <signUpForm.AppField
            children={(field) => (
              <field.FormTextInputField
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
          <PasswordConfirmFieldGroup
            fields={{
              confirmPassword: "confirmPassword",
              password: "password",
            }}
            confirmPasswordLabel="Confirm Password"
            passwordLabel="Password"
            disabled={isSubmitting}
            form={signUpForm}
          />
        </FieldGroup>
        <FieldGroup>
          <signUpForm.AppForm>
            <signUpForm.FormSubmitButton
              submittingText="Signing up..."
              text="Create Account"
            />
          </signUpForm.AppForm>
          <Field>
            <FieldDescription className="px-6 text-center">
              <span>Already have an account?</span>{" "}
              <Link href="/sign-in">Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

export { SignUpForm };
