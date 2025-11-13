import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import type { ZodValidationError, OAuthError } from "@/types/errors";

import { oauthErrorSchema } from "@/features/auth/validators";

export default async function OAuthErrorPage({
  searchParams,
}: PageProps<"/oauth-error">) {
  const searchParametersObject = await searchParams;

  const result = oauthErrorSchema.safeParse(searchParametersObject);

  if (!result.success) {
    const zodValidationError: ZodValidationError = {
      context: {
        zodError: result.error,
      },
      timestamp: new Date().toISOString(),
      message: "Invalid request",
      location: "OAuthErrorPage",
      kind: "validation",
    };

    console.warn(zodValidationError);

    notFound();
  }

  const oauthError: OAuthError = {
    context: {
      searchParametersObject,
    },
    timestamp: new Date().toISOString(),
    message: "Something went wrong",
    location: "OAuthErrorPage",
    kind: "oauth",
  };
  console.error(oauthError);

  const errorType = result.data.error;

  if (errorType === "access_denied") {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-2">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Sorry, something went wrong
      </h1>
      <p className="text-center">
        Please try again later or contact support if the problem persists.
      </p>
      <Link className="underline" href="/sign-in">
        Back to sign in
      </Link>
    </div>
  );
}
