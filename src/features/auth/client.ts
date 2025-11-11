import { createAuthClient } from "better-auth/react";

import { clientEnvironmentVariables } from "@/lib/env/client";

const authClient = createAuthClient({
  baseURL: clientEnvironmentVariables.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export { authClient };
