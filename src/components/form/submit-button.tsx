import { useFormContext } from "@/components/form/context";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

function FormSubmitButton({
  customDisabled,
  submittingText,
  text,
}: {
  customDisabled?: boolean;
  submittingText: string;
  text: string;
}) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        canSubmit: state.canSubmit,
      })}
    >
      {({ isSubmitting, canSubmit }) => (
        <Button
          aria-disabled={customDisabled || !canSubmit || isSubmitting}
          disabled={customDisabled || !canSubmit || isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>
              <Spinner />
              {submittingText}
            </>
          ) : (
            text
          )}
        </Button>
      )}
    </form.Subscribe>
  );
}

export { FormSubmitButton };
