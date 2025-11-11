import { text } from "drizzle-orm/pg-core";

import { userTable } from "@/database/schema/identity";

const userIdForeignKey = text("user_id")
  .notNull()
  .references(() => userTable.id);

export { userIdForeignKey };
