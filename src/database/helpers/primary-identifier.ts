import { uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const primaryIdentifier = uuid("id")
  .primaryKey()
  .default(sql`gen_random_uuid()`);

export { primaryIdentifier };
