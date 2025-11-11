import { uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const primaryKey = uuid("id")
  .primaryKey()
  .default(sql`gen_random_uuid()`);

export { primaryKey };
