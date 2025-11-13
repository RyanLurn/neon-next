"use client";

import { useState } from "react";

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/components/forms/sign-up";
import { ErrorAlert } from "@/components/utilities/error-alert";

export default function SignUpPage() {
  const [serverError, setServerError] = useState<undefined | string>();
  const [view, setView] = useState<"social" | "email">("social");

  function showServerError(errorMessage: string) {
    setServerError(errorMessage);
  }

  function clearServerError() {
    if (serverError) {
      setServerError(undefined);
    }
  }

  function showSocialButtons() {
    setView("social");
  }

  function showEmailForm() {
    setView("email");
  }

  return (
    <div className="flex size-full items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            {view === "social"
              ? "Choose your preferred sign up method"
              : "Enter your information below to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {serverError && (
            <ErrorAlert
              errorTitle="Unable to create your account"
              errorMessage={serverError}
              className="mb-6"
            />
          )}
          <SignUpForm
            showSocialButtons={showSocialButtons}
            showServerError={showServerError}
            showEmailForm={showEmailForm}
            onFocus={clearServerError}
            view={view}
          />
        </CardContent>
      </Card>
    </div>
  );
}
