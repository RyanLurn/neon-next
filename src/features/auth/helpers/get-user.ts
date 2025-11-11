import { type User, APIError } from "better-auth";
import { type Result, err, ok } from "neverthrow";
import { headers } from "next/headers";

import type {
  NotAuthenticatedError,
  AuthLibraryError,
  UnexpectedError,
} from "@/types/errors";

import { auth } from "@/features/auth";

async function getUser(): Promise<
  Result<User, NotAuthenticatedError | AuthLibraryError | UnexpectedError>
> {
  const nextHeaders = await headers();
  try {
    const getSessionResult = await auth.api.getSession({
      headers: nextHeaders,
    });

    if (!getSessionResult) {
      const notAuthenticatedError: NotAuthenticatedError = {
        timestamp: new Date().toISOString(),
        message: "Not authenticated",
        kind: "not-authenticated",
        location: "getUser",
      };

      return err(notAuthenticatedError);
    }

    return ok(getSessionResult.user);
  } catch (error) {
    if (error instanceof APIError) {
      const authLibraryError: AuthLibraryError = {
        context: {
          betterAuthError: {
            message: error.message,
            status: error.status,
          },
        },
        timestamp: new Date().toISOString(),
        message: "Something went wrong",
        kind: "auth-library",
        location: "getUser",
      };

      console.error(authLibraryError);

      return err(authLibraryError);
    }

    const unexpectedError: UnexpectedError = {
      timestamp: new Date().toISOString(),
      context: {
        error,
      },
      message: "Something went wrong",
      location: "getUser",
      kind: "unexpected",
    };

    console.error(unexpectedError);

    return err(unexpectedError);
  }
}

export { getUser };
