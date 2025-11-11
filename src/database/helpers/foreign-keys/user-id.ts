import { uuid } from "drizzle-orm/pg-core";

import { userTable } from "@/database/schema/identity";

const userIdForeignKey = uuid("user_id")
  .notNull()
  .references(() => userTable.id, { onDelete: "cascade" });

export { userIdForeignKey };
