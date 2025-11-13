import type { ComponentProps } from "react";

import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ContinueWithEmailProperties extends ComponentProps<typeof Button> {
  showEmailForm: () => void;
}

function ContinueWithEmail({
  showEmailForm,
  ...properties
}: ContinueWithEmailProperties) {
  return (
    <Button
      onClick={showEmailForm}
      variant="outline"
      type="button"
      {...properties}
    >
      <Mail />
      <span>Continue with Email</span>
    </Button>
  );
}

export { ContinueWithEmail };
