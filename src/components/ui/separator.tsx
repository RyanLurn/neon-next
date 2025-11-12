"use client";

import type { ComponentProps } from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utilities";

function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...properties
}: ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      orientation={orientation}
      decorative={decorative}
      data-slot="separator"
      {...properties}
    />
  );
}

export { Separator };
