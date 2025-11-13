import { ContinueWithGithub } from "@/features/auth/components/oauth/continue-with-github";
import { ContinueWithGoogle } from "@/features/auth/components/oauth/continue-with-google";
import { Field } from "@/components/ui/field";

function OAuthOptions({
  showServerError,
  isOAuthPending,
  isSubmitting,
  finishOAuth,
  startOAuth,
}: {
  showServerError: (errorMessage: string) => void;
  finishOAuth: () => void;
  isOAuthPending: boolean;
  startOAuth: () => void;
  isSubmitting: boolean;
}) {
  return (
    <Field>
      <ContinueWithGoogle
        disabled={isSubmitting || isOAuthPending}
        showServerError={showServerError}
        finishOAuth={finishOAuth}
        startOAuth={startOAuth}
      />
      <ContinueWithGithub
        disabled={isSubmitting || isOAuthPending}
        showServerError={showServerError}
        finishOAuth={finishOAuth}
        startOAuth={startOAuth}
      />
    </Field>
  );
}

export { OAuthOptions };
