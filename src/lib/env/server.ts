import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

const serverEnvironmentVariables = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
  },
  experimental__runtimeEnv: process.env,
});

export { serverEnvironmentVariables };
