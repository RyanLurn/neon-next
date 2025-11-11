import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

const serverEnvironmentVariables = createEnv({
  server: {
    NEON_POOLED_CONNECTION_STRING: z.url(),
    NEON_DIRECT_CONNECTION_STRING: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
  },
  experimental__runtimeEnv: process.env,
});

export { serverEnvironmentVariables };
