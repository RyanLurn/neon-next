import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

const serverEnvironmentVariables = createEnv({
  server: {
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    NEON_POOLED_CONNECTION_STRING: z.url(),
    NEON_DIRECT_CONNECTION_STRING: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
  },
  experimental__runtimeEnv: process.env,
});

export { serverEnvironmentVariables };
