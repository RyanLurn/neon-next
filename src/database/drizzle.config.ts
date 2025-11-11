import { defineConfig } from "drizzle-kit";

import { serverEnvironmentVariables } from "@/lib/env/server";

export default defineConfig({
  dbCredentials: {
    url: serverEnvironmentVariables.NEON_DIRECT_CONNECTION_STRING,
  },
  out: "./src/database/migrations",
  schema: "./src/database/schema",
  dialect: "postgresql",
});
