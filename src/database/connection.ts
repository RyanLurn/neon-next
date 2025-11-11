import { drizzle } from "drizzle-orm/neon-http";

import { serverEnvironmentVariables } from "@/lib/env/server";
import * as identityTables from "@/database/schema/identity";

const database = drizzle({
  connection: serverEnvironmentVariables.NEON_POOLED_CONNECTION_STRING,
  schema: { ...identityTables },
});

export { database };
