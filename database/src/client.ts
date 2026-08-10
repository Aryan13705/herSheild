import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./modules/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("[Database] DATABASE_URL is not set. Database features will be unavailable.");
}

// Create a lazy db reference that only errors when actually used
const sql = databaseUrl ? neon(databaseUrl) : null;

// @ts-ignore - null sql for graceful dev mode without a DB
export const db = sql ? drizzle(sql, { schema }) : null as any;

// Health check utility
export async function checkDatabaseHealth(): Promise<boolean> {
  if (!db) return false;
  try {
    const result = await db.execute('SELECT 1');
    return result.length > 0;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}
