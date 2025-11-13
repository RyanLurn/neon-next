import type { ComponentProps } from "react";
import type { Route } from "next";

import { GoogleLogo } from "@/features/auth/components/oauth/logos/google";
import { authClient } from "@/features/auth/client";
import { Button } from "@/components/ui/button";

interface ContinueWithGoogleProperties extends ComponentProps<typeof Button> {
  showServerError: (errorMessage: string) => void;
  finishOAuth: () => void;
  startOAuth: () => void;
}

function ContinueWithGoogle({
  variant = "default",
  showServerError,
  finishOAuth,
  startOAuth,
  ...properties
}: ContinueWithGoogleProperties) {
  async function handleClick() {
    startOAuth();

    const { error } = await authClient.signIn.social({
      errorCallbackURL: "/oauth-error" as Route,
      callbackURL: "/protected" as Route,
      provider: "google",
    });

    if (error) {
      showServerError(error.message ?? "Something went wrong.");
      finishOAuth();
    }
  }

  return (
    <Button
      variant={variant}
      {...properties}
      onClick={() => void handleClick()}
      type="button"
    >
      <GoogleLogo />
      <span>Continue with Google</span>
    </Button>
  );
}

export { ContinueWithGoogle };
