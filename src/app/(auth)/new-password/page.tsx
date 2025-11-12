import { notFound } from "next/navigation";

import type { ZodValidationError } from "@/types/errors";

import { newPasswordPageSearchParametersValidator } from "@/features/auth/validators";
import { InvalidTokenPage } from "@/features/auth/components/pages/invalid-token";
import { NewPasswordPage } from "@/features/auth/components/pages/new-password";

export default async function NewPassword({
  searchParams,
}: PageProps<"/new-password">) {
  const searchParametersObject = await searchParams;

  const result = newPasswordPageSearchParametersValidator.safeParse(
    searchParametersObject
  );

  if (!result.success) {
    const zodValidationError: ZodValidationError = {
      context: {
        zodError: result.error,
      },
      timestamp: new Date().toISOString(),
      message: "Invalid request",
      location: "new-password",
      kind: "validation",
    };

    console.warn(zodValidationError);

    notFound();
  }

  const token = "token" in result.data ? result.data.token : undefined;

  if (!token) {
    return <InvalidTokenPage />;
  }

  return <NewPasswordPage token={token} />;
}
