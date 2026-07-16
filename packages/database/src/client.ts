import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./modules/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(databaseUrl);

export const db = drizzle(sql, { schema });

// Health check utility
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const result = await db.execute('SELECT 1');
    return result.length > 0;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}
