import { pgTable, varchar, uuid, integer, jsonb } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps } from "../../utils/timestamps";

export const systemEvents = pgTable("system_events", {
  id: primaryKey(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  actorId: uuid("actor_id"),
  metadata: jsonb("metadata"),
  ...timestamps,
});

export const searchHistory = pgTable("search_history", {
  id: primaryKey(),
  userId: uuid("user_id"),
  query: varchar("query", { length: 500 }).notNull(),
  filters: jsonb("filters"),
  resultsCount: integer("results_count"),
  ...timestamps,
});

export const recommendationCache = pgTable("recommendation_cache", {
  id: primaryKey(),
  cacheKey: varchar("cache_key", { length: 255 }).notNull().unique(),
  data: jsonb("data").notNull(),
  expiresAt: timestamps.createdAt.notNull(),
  ...timestamps,
});
