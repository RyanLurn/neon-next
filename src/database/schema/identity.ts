/* eslint-disable perfectionist/sort-objects */
import { boolean, pgTable, text } from "drizzle-orm/pg-core";

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

export { userTable };
