import { pgSchema } from "drizzle-orm/pg-core";

// A hack to reuse the same Neon project for many apps
// Useful for developing examples, templates or prototypes like Neon Next
const neonNextSchema = pgSchema("neon_next");

export { neonNextSchema };
