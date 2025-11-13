import type { ComponentProps } from "react";
import type { Route } from "next";

import { GitHubLogo } from "@/features/auth/components/oauth/logos/github";
import { GoogleLogo } from "@/features/auth/components/oauth/logos/google";
import { authClient } from "@/features/auth/client";
import { Button } from "@/components/ui/button";

interface OAuthButtonProperties extends ComponentProps<typeof Button> {
  showServerError: (errorMessage: string) => void;
  provider: "github" | "google";
  finishOAuth: () => void;
  startOAuth: () => void;
}

function OAuthButton({
  showServerError,
  finishOAuth,
  startOAuth,
  provider,
  variant,
  ...properties
}: OAuthButtonProperties) {
  async function handleClick() {
    startOAuth();

    const { error } = await authClient.signIn.social({
      errorCallbackURL: "/oauth-error" as Route,
      callbackURL: "/protected" as Route,
      provider,
    });

    if (error) {
      showServerError(error.message ?? "Something went wrong.");
    }

    finishOAuth();
  }
  return (
    <Button
      onClick={() => void handleClick()}
      variant={variant}
      type="button"
      {...properties}
    >
      {provider === "github" ? <GitHubLogo /> : <GoogleLogo />}
      <span>Continue with {provider === "github" ? "GitHub" : "Google"}</span>
    </Button>
  );
}

export { OAuthButton };
