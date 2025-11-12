import type { ComponentProps } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utilities";

function Empty({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      data-slot="empty"
      {...properties}
    />
  );
}

function EmptyHeader({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      data-slot="empty-header"
      {...properties}
    />
  );
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        icon: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6",
        default: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function EmptyDescription({ className, ...properties }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      data-slot="empty-description"
      {...properties}
    />
  );
}

function EmptyMedia({
  variant = "default",
  className,
  ...properties
}: VariantProps<typeof emptyMediaVariants> & ComponentProps<"div">) {
  return (
    <div
      className={cn(emptyMediaVariants({ className, variant }))}
      data-slot="empty-icon"
      data-variant={variant}
      {...properties}
    />
  );
}

function EmptyContent({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      )}
      data-slot="empty-content"
      {...properties}
    />
  );
}

function EmptyTitle({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn("text-lg font-medium tracking-tight", className)}
      data-slot="empty-title"
      {...properties}
    />
  );
}

export {
  EmptyDescription,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
  EmptyMedia,
  Empty,
};
