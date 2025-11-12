import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { Result } from "neverthrow";

import { getTestMessageUrl } from "nodemailer";
import { err, ok } from "neverthrow";

import type { EmailType } from "@/features/emails/types";
import type { UnexpectedError } from "@/types/errors";

import { createEtherealTransport } from "@/features/emails/ethereal";

async function sendDevelopmentEmail(
  email: EmailType
): Promise<Result<SMTPTransport.SentMessageInfo, UnexpectedError>> {
  try {
    const transporter = await createEtherealTransport();

    const result = await transporter.sendMail(email);

    console.log("Preview URL:", getTestMessageUrl(result));

    return ok(result);
  } catch (error) {
    const etherealError: UnexpectedError = {
      timestamp: new Date().toISOString(),
      context: {
        error,
      },
      location: "sendDevelopmentEmail",
      message: "Failed to send email",
      kind: "unexpected",
    };

    console.error(etherealError);

    return err(etherealError);
  }
}

export { sendDevelopmentEmail };
