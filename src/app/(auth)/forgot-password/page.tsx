"use client";

import { useState } from "react";

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "@/features/auth/components/forms/forgot-password";
import { SuccessAlert } from "@/components/utilities/success-alert";
import { ErrorAlert } from "@/components/utilities/error-alert";

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<undefined | string>();
  const [serverSuccess, setServerSuccess] = useState<undefined | string>();

  function showServerError(errorMessage: string) {
    setServerError(errorMessage);
  }

  function showServerSuccess(successMessage: string) {
    setServerSuccess(successMessage);
  }

  function clearServerMessage() {
    if (serverError) {
      setServerError(undefined);
    }
    if (serverSuccess) {
      setServerSuccess(undefined);
    }
  }

  return (
    <div className="flex size-full items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {serverError && (
            <ErrorAlert
              errorTitle="Unable to process your request"
              errorMessage={serverError}
              className="mb-6"
            />
          )}
          {serverSuccess && (
            <SuccessAlert
              successTitle="Your request has been processed"
              successMessage={serverSuccess}
              className="mb-6"
            />
          )}
          <ForgotPasswordForm
            showServerSuccess={showServerSuccess}
            showServerError={showServerError}
            onFocus={clearServerMessage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
