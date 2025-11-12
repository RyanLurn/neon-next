"use client";

import type { Route } from "next";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/features/auth/client";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const COOLDOWN = process.env.NODE_ENV === "production" ? 60 : 5;

function ResendButton() {
  const searchParameters = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setCooldown((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  const email = searchParameters.get("email");

  async function resendVerificationLink() {
    if (!email) {
      return;
    }
    setIsPending(true);
    const { error } = await authClient.sendVerificationEmail({
      callbackURL: "/protected" as Route,
      email,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Verification link sent. Please check your email.");
    }
    setIsPending(false);
    setCooldown(COOLDOWN);
  }

  return (
    <Button
      onClick={() => void resendVerificationLink()}
      disabled={isPending || cooldown > 0}
      className="w-3xs self-center"
    >
      {isPending ? (
        <>
          <Spinner />
          Resending, please wait...
        </>
      ) : cooldown > 0 ? (
        <>
          <Timer />
          Please wait {cooldown} seconds
        </>
      ) : (
        "Resend verification link"
      )}
    </Button>
  );
}

export { ResendButton };
