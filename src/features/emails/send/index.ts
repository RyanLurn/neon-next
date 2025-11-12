import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { CreateEmailResponseSuccess } from "resend";
import type { Result } from "neverthrow";

import "server-only";

import type { UnexpectedError, ResendError } from "@/types/errors";
import type { EmailType } from "@/features/emails/types";

import { sendDevelopmentEmail } from "@/features/emails/send/development";
import { sendProductionEmail } from "@/features/emails/send/production";

async function sendEmail(
  email: EmailType
): Promise<
  Result<
    SMTPTransport.SentMessageInfo | CreateEmailResponseSuccess,
    UnexpectedError | ResendError
  >
> {
  if (process.env.NODE_ENV === "production") {
    const sendResult = await sendProductionEmail(email);

    return sendResult;
  }

  const sendResult = await sendDevelopmentEmail(email);

  return sendResult;
}

export { sendEmail };
