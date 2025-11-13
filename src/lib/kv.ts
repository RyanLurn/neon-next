import { Redis } from "@upstash/redis";

import { serverEnvironmentVariables } from "@/lib/env/server";

const kv = new Redis({
  token: serverEnvironmentVariables.UPSTASH_REDIS_REST_TOKEN,
  url: serverEnvironmentVariables.UPSTASH_REDIS_REST_URL,
});

export { kv };
