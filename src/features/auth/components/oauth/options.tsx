import { ContinueWithGithub } from "@/features/auth/components/oauth/continue-with-github";
import { ContinueWithGoogle } from "@/features/auth/components/oauth/continue-with-google";
import { Field } from "@/components/ui/field";

function OAuthOptions({
  showServerError,
  isSubmitting,
}: {
  showServerError: (errorMessage: string) => void;
  isSubmitting: boolean;
}) {
  return (
    <Field>
      <ContinueWithGoogle
        showServerError={showServerError}
        disabled={isSubmitting}
      />
      <ContinueWithGithub
        showServerError={showServerError}
        disabled={isSubmitting}
      />
    </Field>
  );
}

export { OAuthOptions };
