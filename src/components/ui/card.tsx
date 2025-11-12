import type { ComponentProps } from "react";

import { cn } from "@/lib/utilities";

function CardHeader({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      data-slot="card-header"
      {...properties}
    />
  );
}

function Card({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        className
      )}
      data-slot="card"
      {...properties}
    />
  );
}

function CardAction({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      data-slot="card-action"
      {...properties}
    />
  );
}

function CardDescription({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="card-description"
      {...properties}
    />
  );
}

function CardFooter({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      data-slot="card-footer"
      {...properties}
    />
  );
}

function CardTitle({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn("leading-none font-semibold", className)}
      data-slot="card-title"
      {...properties}
    />
  );
}

function CardContent({ className, ...properties }: ComponentProps<"div">) {
  return (
    <div
      className={cn("px-6", className)}
      data-slot="card-content"
      {...properties}
    />
  );
}

export {
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
  CardAction,
  CardTitle,
  Card,
};
