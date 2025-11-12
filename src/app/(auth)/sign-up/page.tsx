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

  function showServerError(errorMessage: string) {
    setServerError(errorMessage);
  }

  function clearServerError() {
    if (serverError) {
      setServerError(undefined);
    }
  }

  return (
    <div className="flex size-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to sign up
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
              showServerError={showServerError}
              onFocus={clearServerError}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
