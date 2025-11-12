import type { ComponentProps } from "react";

import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utilities";

function Spinner({ className, ...properties }: ComponentProps<"svg">) {
  return (
    <Loader2Icon
      className={cn("size-4 animate-spin", className)}
      aria-label="Loading"
      role="status"
      {...properties}
    />
  );
}

export { Spinner };
