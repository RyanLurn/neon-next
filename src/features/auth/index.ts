import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

import {
  verificationTable,
  sessionTable,
  accountTable,
  userTable,
} from "@/database/schema/identity";
import { database } from "@/database/connection";

const auth = betterAuth({
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
  plugins: [nextCookies()], // make sure that nextCookies is the last plugin in the array
});

export { auth };
