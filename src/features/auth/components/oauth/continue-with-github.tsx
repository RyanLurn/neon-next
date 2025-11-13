import type { ComponentProps } from "react";
import type { Route } from "next";

import { GitHubLogo } from "@/features/auth/components/oauth/logos/github";
import { authClient } from "@/features/auth/client";
import { Button } from "@/components/ui/button";

interface ContinueWithGithubProperties extends ComponentProps<typeof Button> {
  showServerError: (errorMessage: string) => void;
  finishOAuth: () => void;
  startOAuth: () => void;
}

function ContinueWithGithub({
  variant = "outline",
  showServerError,
  finishOAuth,
  startOAuth,
  ...properties
}: ContinueWithGithubProperties) {
  async function handleClick() {
    startOAuth();

    const { error } = await authClient.signIn.social({
      errorCallbackURL: "/oauth-error" as Route,
      callbackURL: "/protected" as Route,
      provider: "github",
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
      <GitHubLogo />
      <span>Continue with GitHub</span>
    </Button>
  );
}

export { ContinueWithGithub };
