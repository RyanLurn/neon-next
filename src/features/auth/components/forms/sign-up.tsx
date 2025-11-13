import type { Route } from "next";

import { type ComponentProps, type FormEvent, Activity, useState } from "react";
import { useStore } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import {
  FieldDescription,
  FieldSeparator,
  FieldGroup,
  FieldSet,
  Field,
} from "@/components/ui/field";
import { PasswordConfirmFieldGroup } from "@/features/auth/components/password-confirm-field-group";
import { ContinueWithEmail } from "@/features/auth/components/continue-with-email";
import { emailValidator, nameValidator } from "@/features/auth/validators";
import { OAuthOptions } from "@/features/auth/components/oauth/options";
import { useAppForm } from "@/components/form/hook";
import { authClient } from "@/features/auth/client";
import { Button } from "@/components/ui/button";

interface SignUpFormProperties extends ComponentProps<"form"> {
  showServerError: (errorMessage: string) => void;
}

function SignUpForm({ showServerError, ...properties }: SignUpFormProperties) {
  const router = useRouter();

  const [view, setView] = useState<"social" | "email">("social");

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

  function showSocialButtons() {
    setView("social");
  }

  function showEmailForm() {
    setView("email");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await signUpForm.handleSubmit();
  }

  return (
    <form {...properties} onSubmit={(event) => void handleSubmit(event)}>
      <FieldSet>
        <Activity mode={view === "social" ? "visible" : "hidden"}>
          <OAuthOptions
            showServerError={showServerError}
            isSubmitting={isSubmitting}
          />
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            Or
          </FieldSeparator>
          <Field>
            <ContinueWithEmail showEmailForm={showEmailForm} />
          </Field>
        </Activity>
        <Activity mode={view === "email" ? "visible" : "hidden"}>
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
          <FieldGroup className="gap-y-3">
            <signUpForm.AppForm>
              <signUpForm.FormSubmitButton
                submittingText="Signing up..."
                text="Create Account"
              />
            </signUpForm.AppForm>
            <signUpForm.Subscribe
              selector={(state) => ({
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ isSubmitting }) => (
                <Button
                  aria-disabled={isSubmitting}
                  onClick={showSocialButtons}
                  disabled={isSubmitting}
                  variant="link"
                  type="button"
                >
                  <ArrowLeft />
                  <span>Back to other options</span>
                </Button>
              )}
            </signUpForm.Subscribe>
          </FieldGroup>
        </Activity>
        <Field>
          <FieldDescription className="px-6 text-center">
            <span>Already have an account?</span>{" "}
            <Link href="/sign-in">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldSet>
    </form>
  );
}

export { SignUpForm };
