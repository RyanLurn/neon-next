import { ShieldX } from "lucide-react";
import Link from "next/link";

import {
  EmptyDescription,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Empty,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

function InvalidTokenPage() {
  return (
    <Empty className="size-full bg-linear-to-b from-muted/50 from-30% to-background">
      <EmptyHeader className="max-w-md">
        <EmptyMedia variant="icon">
          <ShieldX />
        </EmptyMedia>
        <EmptyTitle>Invalid Reset Password Link</EmptyTitle>
        <EmptyDescription>
          The reset password link you are trying to use is invalid or has been
          expired.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="max-w-md">
        <div className="flex flex-col text-left">
          <h2 className="scroll-m-20 font-semibold tracking-tight">
            This could mean a few things:
          </h2>
          <ul className="my-2 ml-6 list-disc space-y-2">
            <li>You might have made a typo when entering the link.</li>
            <li>
              The email you got this link from is too old. We give each one an
              expiration time for security reasons.
            </li>
          </ul>
          <h2 className="scroll-m-20 font-semibold tracking-tight">
            Here's what you can do:
          </h2>
          <ul className="my-2 ml-6 list-disc space-y-2">
            <li>
              Check your email to see when it was sent. If it's more than an
              hour ago, it has probably been expired.
            </li>
            <li>
              If it hasn't been expired, try copying the link and pasting it
              into your browser to make sure that you're not typing it wrong.
            </li>
            <li>
              If nothing works, click the button below to request a new password
              reset link.
            </li>
            <li>
              If you have seen this page multiple times, please contact support
              at
              <a href="mailto:support@neonnext.com">support@neonnext.com</a>.
            </li>
          </ul>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/forgot-password">Request a new link</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export { InvalidTokenPage };
