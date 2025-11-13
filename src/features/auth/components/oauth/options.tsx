import { OAuthButton } from "@/features/auth/components/oauth/button";
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
      <OAuthButton
        disabled={isSubmitting || isOAuthPending}
        showServerError={showServerError}
        finishOAuth={finishOAuth}
        startOAuth={startOAuth}
        provider="google"
        variant="default"
      />
      <OAuthButton
        disabled={isSubmitting || isOAuthPending}
        showServerError={showServerError}
        finishOAuth={finishOAuth}
        startOAuth={startOAuth}
        variant="secondary"
        provider="github"
      />
    </Field>
  );
}

export { OAuthOptions };
