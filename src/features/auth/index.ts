import { drizzleAdapter } from "better-auth/adapters/drizzle";
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
import { sendEmail } from "@/features/emails/send";
import { database } from "@/database/connection";

const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const verificationEmail: EmailType = {
        html: `<p>Please click this link to verify your email: <a href="${url}" target="_blank">${url}</a></p>`,
        text: `Please click this link to verify your email: ${url}`,
        subject: "Verify your email address",
        from: "support@neonrain.com",
        to: user.email,
      };
      const sendEmailResult = await sendEmail(verificationEmail);

      if (sendEmailResult.isErr()) {
        throw new Error(sendEmailResult.error.message);
      }
    },
    sendOnSignUp: true,
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
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()], // make sure that nextCookies is the last plugin in the array
});

export { auth };
