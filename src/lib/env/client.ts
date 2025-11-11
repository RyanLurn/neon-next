import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

const clientEnvironmentVariables = createEnv({
  runtimeEnv: {
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  },
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.url(),
  },
});

export { clientEnvironmentVariables };
