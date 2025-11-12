import { CheckCircle } from "lucide-react";

import { AlertDescription, AlertTitle, Alert } from "@/components/ui/alert";

function SuccessAlert({
  successMessage,
  successTitle,
  className,
}: {
  successMessage: string;
  successTitle: string;
  className?: string;
}) {
  return (
    <Alert className={className} variant="success">
      <CheckCircle />
      <AlertTitle>{successTitle}</AlertTitle>
      <AlertDescription>{successMessage}</AlertDescription>
    </Alert>
  );
}
export { SuccessAlert };
