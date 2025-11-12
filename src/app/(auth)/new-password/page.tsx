import { notFound } from "next/navigation";

import type { ZodValidationError } from "@/types/errors";

import { newPasswordPageSearchParametersValidator } from "@/features/auth/validators";
import { cn } from "@/lib/utilities";

export default async function NewPasswordPage({
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

  return (
    <div
      className={cn(
        "size-full",
        token && "flex items-center justify-center p-6 md:p-10"
      )}
    >
      {token ? (
        <div className="w-full max-w-sm">
          {/* <NewPasswordForm token={token} /> */}
        </div>
      ) : (
        // <InvalidToken />
        <p>Invalid token</p>
      )}
    </div>
  );
}
