import type { ComponentProps } from "react";

import { GitHubLogo } from "@/features/auth/components/oauth/logos/github";
import { authClient } from "@/features/auth/client";
import { Button } from "@/components/ui/button";

interface ContinueWithGithubProperties extends ComponentProps<typeof Button> {
  showServerError: (errorMessage: string) => void;
}

function ContinueWithGithub({
  variant = "outline",
  showServerError,
  ...properties
}: ContinueWithGithubProperties) {
  async function handleClick() {
    const { error } = await authClient.signIn.social({
      provider: "github",
    });

    if (error) {
      showServerError(error.message ?? "Something went wrong.");
    }
  }

  return (
    <Button
      variant={variant}
      {...properties}
      onClick={() => void handleClick()}
    >
      <GitHubLogo />
      <span>Continue with GitHub</span>
    </Button>
  );
}

export { ContinueWithGithub };
