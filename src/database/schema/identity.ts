/* eslint-disable perfectionist/sort-objects */
import { timestamp, boolean, pgTable, index, text } from "drizzle-orm/pg-core";

import { primaryIdentifier } from "@/database/helpers/primary-identifier";
import { userId } from "@/database/helpers/foreign-keys/user-id";
import { timestamps } from "@/database/helpers/timestamps";

const userTable = pgTable("users", {
  id: primaryIdentifier,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  ...timestamps,
});

const sessionTable = pgTable(
  "sessions",
  {
    id: primaryIdentifier,
    userId,
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    ...timestamps,
  },
  (table) => [index("sessions_user_id_idx").on(table.userId)]
);

const accountTable = pgTable(
  "accounts",
  {
    id: primaryIdentifier,
    userId,
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      mode: "date",
      withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      mode: "date",
      withTimezone: true,
    }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    ...timestamps,
  },
  (table) => [index("accounts_user_id_idx").on(table.userId)]
);

const verificationTable = pgTable(
  "verifications",
  {
    id: primaryIdentifier,
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
    ...timestamps,
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)]
);

export { verificationTable, accountTable, sessionTable, userTable };
