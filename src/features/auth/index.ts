import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { haveIBeenPwned } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

import type { EmailType } from "@/features/emails/types";

import {
  verificationTable,
  sessionTable,
  accountTable,
  userTable,
} from "@/database/schema/identity";
import { serverEnvironmentVariables } from "@/lib/env/server";
import { SUPPORT_EMAIL } from "@/features/emails/constants";
import { sendEmail } from "@/features/emails/send";
import { database } from "@/database/connection";

const haveIBeenPwnedPlugin = haveIBeenPwned({
  customPasswordCompromisedMessage:
    "Your chosen password has been found in a data breach. Please choose a more secure password.",
});

const auth = betterAuth({
  emailAndPassword: {
    sendResetPassword: async ({ user, url }) => {
      const resetPasswordEmail: EmailType = {
        html: `<p>Please click this link to reset your password: <a href="${url}" target="_blank">${url}</a></p>`,
        text: `Please click this link to reset your password: ${url}`,
        subject: "Reset your password",
        from: SUPPORT_EMAIL,
        to: user.email,
      };
      const sendEmailResult = await sendEmail(resetPasswordEmail);

      if (sendEmailResult.isErr()) {
        throw new Error(sendEmailResult.error.message);
      }
    },
    revokeSessionsOnPasswordReset: true,
    requireEmailVerification: true,
    enabled: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const verificationEmail: EmailType = {
        html: `<p>Please click this link to verify your email: <a href="${url}" target="_blank">${url}</a></p>`,
        text: `Please click this link to verify your email: ${url}`,
        subject: "Verify your email address",
        from: SUPPORT_EMAIL,
        to: user.email,
      };
      const sendEmailResult = await sendEmail(verificationEmail);

      if (sendEmailResult.isErr()) {
        throw new Error(sendEmailResult.error.message);
      }
    },
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendOnSignIn: true,
  },
  database: drizzleAdapter(database, {
    schema: {
      verification: verificationTable,
      session: sessionTable,
      account: accountTable,
      user: userTable,
    },
    provider: "pg",
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  secret: serverEnvironmentVariables.BETTER_AUTH_SECRET,
  baseURL: serverEnvironmentVariables.BETTER_AUTH_URL,
  plugins: [haveIBeenPwnedPlugin, nextCookies()], // make sure that nextCookies is the last plugin in the array
});

export { auth };
