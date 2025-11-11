import { drizzle } from "drizzle-orm/neon-http";

import { serverEnvironmentVariables } from "@/lib/env/server";

const database = drizzle({
  connection: serverEnvironmentVariables.NEON_POOLED_CONNECTION_STRING,
});

export { database };
