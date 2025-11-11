/* eslint-disable perfectionist/sort-objects */
import { timestamp, boolean, pgTable, text } from "drizzle-orm/pg-core";

import { userIdForeignKey } from "@/database/helpers/foreign-keys/user-id";
import { primaryIdentifier } from "@/database/helpers/primary-identifier";
import { timestamps } from "@/database/helpers/timestamps";

const userTable = pgTable("users", {
  id: primaryIdentifier,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  ...timestamps,
});

const sessionTable = pgTable("sessions", {
  id: primaryIdentifier,
  userIdForeignKey,
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  ...timestamps,
});

export { sessionTable, userTable };
