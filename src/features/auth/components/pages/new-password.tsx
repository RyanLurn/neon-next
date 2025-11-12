"use client";

import { useState } from "react";

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { NewPasswordForm } from "@/features/auth/components/forms/new-password";
import { ErrorAlert } from "@/components/utilities/error-alert";

function NewPasswordPage({ token }: { token: string }) {
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
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>New Password</CardTitle>
          <CardDescription>
            Specify and confirm your new password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {serverError && (
            <ErrorAlert
              errorTitle="Unable to update your password"
              errorMessage={serverError}
              className="mb-6"
            />
          )}
          <NewPasswordForm
            showServerError={showServerError}
            onFocus={clearServerError}
            token={token}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export { NewPasswordPage };
