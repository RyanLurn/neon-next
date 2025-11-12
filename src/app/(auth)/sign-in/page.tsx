"use client";

import { useState } from "react";

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { SignInForm } from "@/features/auth/components/forms/sign-in";
import { ErrorAlert } from "@/components/utilities/error-alert";

export default function SignInPage() {
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
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials below to sign in
            </CardDescription>
          </CardHeader>
          <CardContent>
            {serverError && (
              <ErrorAlert
                errorTitle="Unable to sign in"
                errorMessage={serverError}
                className="mb-6"
              />
            )}
            <SignInForm
              showServerError={showServerError}
              onFocus={clearServerError}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
