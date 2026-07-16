import { uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * Helper to standardise UUID primary keys across all tables using UUIDv4
 */
export const primaryKey = () => uuid("id").primaryKey().default(sql`gen_random_uuid()`);
