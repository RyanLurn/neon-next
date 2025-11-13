import type { Route } from "next";

import { type ComponentProps, type FormEvent, useState } from "react";
import { useStore } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FieldDescription,
  FieldSeparator,
  FieldGroup,
  FieldSet,
  Field,
} from "@/components/ui/field";
import { passwordValidator, emailValidator } from "@/features/auth/validators";
import { OAuthOptions } from "@/features/auth/components/oauth/options";
import { useAppForm } from "@/components/form/hook";
import { authClient } from "@/features/auth/client";

interface SignInFormProperties extends ComponentProps<"form"> {
  showServerError: (errorMessage: string) => void;
}

function SignInForm({ showServerError, ...properties }: SignInFormProperties) {
  const router = useRouter();
  const [isOAuthPending, setIsOAuthPending] = useState(false);

  const signInForm = useAppForm({
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        ...value,
        callbackURL: "/protected" as Route,
      });

      if (error) {
        if (error.status === 403) {
          router.push(
            `/sign-in/verify-email?email=${encodeURIComponent(value.email)}`
          );
        } else {
          showServerError(error.message ?? "Something went wrong.");
        }
      } else {
        router.push("/protected");
      }
    },
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const isSubmitting = useStore(
    signInForm.store,
    (state) => state.isSubmitting
  );

  function startOAuth() {
    setIsOAuthPending(true);
  }

  function finishOAuth() {
    setIsOAuthPending(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await signInForm.handleSubmit();
  }

  return (
    <form {...properties} onSubmit={(event) => void handleSubmit(event)}>
      <FieldSet>
        <OAuthOptions
          showServerError={showServerError}
          isOAuthPending={isOAuthPending}
          isSubmitting={isSubmitting}
          finishOAuth={finishOAuth}
          startOAuth={startOAuth}
        />
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>
        <FieldGroup>
          <signInForm.AppField
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
          <signInForm.AppField
            children={(field) => (
              <field.FormTextInputField
                disabled={isSubmitting}
                label="Password"
                type="password"
                required
              />
            )}
            validators={{
              onChange: passwordValidator,
            }}
            name="password"
          />
          <Field>
            <Link
              className="text-sm underline-offset-4 hover:underline"
              href="/forgot-password"
            >
              Forgot your password? Click here to reset.
            </Link>
          </Field>
        </FieldGroup>
        <FieldGroup>
          <signInForm.AppForm>
            <signInForm.FormSubmitButton
              submittingText="Signing in..."
              text="Sign In"
            />
          </signInForm.AppForm>
          <Field>
            <FieldDescription className="px-6 text-center">
              <span>Don't have an account?</span>{" "}
              <Link
                onNavigate={(event) => {
                  if (isSubmitting || isOAuthPending) {
                    event.preventDefault();
                  }
                }}
                href="/sign-up"
              >
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

export { SignInForm };
