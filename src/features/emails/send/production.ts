import { err, ok } from "neverthrow";
import { Resend } from "resend";

import type { EmailType } from "@/features/emails/types";
import type { ResendError } from "@/types/errors";

import { serverEnvironmentVariables } from "@/lib/env/server";

async function sendProductionEmail(email: EmailType) {
  const resend = new Resend(serverEnvironmentVariables.RESEND_API_KEY);

  const { error, data } = await resend.emails.send(email);

  if (error) {
    const resendError: ResendError = {
      timestamp: new Date().toISOString(),
      context: {
        error,
      },
      location: "sendProductionEmail",
      message: "Failed to send email",
      kind: "resend",
    };

    return err(resendError);
  }

  return ok(data);
}

export { sendProductionEmail };
