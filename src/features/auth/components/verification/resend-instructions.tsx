import { ResendButton } from "@/features/auth/components/verification/resend-button";

function ResendInstructions() {
  return (
    <div className="mt-4 flex max-w-sm flex-col gap-y-3">
      <p className="text-lg font-semibold">
        Cannot find the verification email we sent you?
      </p>
      <p className="leading-7">Please follow these steps:</p>
      <ol className="mb-2 ml-6 list-disc">
        <li>Check your spam/junk folder</li>
        <li>
          If you still cannot find it, click the button below. We'll send you a
          different email with a new link.
        </li>
      </ol>
      <ResendButton />
    </div>
  );
}

export { ResendInstructions };
