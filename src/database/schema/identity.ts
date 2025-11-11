import { boolean, pgTable, text } from "drizzle-orm/pg-core";

import { primaryIdentifier } from "@/database/helpers/primary-identifier";
import { timestamps } from "@/database/helpers/timestamps";

const userTable = pgTable("users", {
  emailVerified: boolean("email_verified").default(false).notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  id: primaryIdentifier,
  image: text("image"),
  ...timestamps,
});

export { userTable };
