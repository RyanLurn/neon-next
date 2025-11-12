import { TriangleAlert } from "lucide-react";

import { AlertDescription, AlertTitle, Alert } from "@/components/ui/alert";

function ErrorAlert({
  errorMessage,
  errorTitle,
  className,
}: {
  errorMessage: string;
  errorTitle: string;
  className?: string;
}) {
  return (
    <Alert variant="destructive" className={className}>
      <TriangleAlert />
      <AlertTitle>{errorTitle}</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
export { ErrorAlert };
