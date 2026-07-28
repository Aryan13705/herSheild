import { pgTable, varchar, uuid, text, integer, numeric, boolean, jsonb } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps } from "../../utils/timestamps";
import { users } from "../iam/tables";
import { sql } from "drizzle-orm";
// Assume customType for pgvector or native vector
import { customType } from "drizzle-orm/pg-core";

const vector = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return "vector(1536)";
  },
  toDriver(value: number[]): string {
    return JSON.stringify(value);
  },
});

export const aiConversations = pgTable("ai_conversations", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }),
  ...timestamps,
});

export const aiMessages = pgTable("ai_messages", {
  id: primaryKey(),
  conversationId: uuid("conversation_id").notNull().references(() => aiConversations.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 50 }).notNull(), // user, assistant, system
  content: text("content").notNull(),
  ...timestamps,
});

export const aiUsage = pgTable("ai_usage", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  provider: varchar("provider", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  inputTokens: integer("input_tokens").notNull(),
  outputTokens: integer("output_tokens").notNull(),
  latencyMs: integer("latency_ms"),
  estimatedCost: numeric("estimated_cost", { precision: 10, scale: 6 }),
  ...timestamps,
});

export const aiPromptTemplates = pgTable("ai_prompt_templates", {
  id: primaryKey(),
  version: integer("version").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  systemPrompt: text("system_prompt").notNull(),
  variables: jsonb("variables"),
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});

export const aiFeedback = pgTable("ai_feedback", {
  id: primaryKey(),
  conversationId: uuid("conversation_id").notNull().references(() => aiConversations.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  reportReason: varchar("report_reason", { length: 255 }),
  comments: text("comments"),
  ...timestamps,
});

export const aiEmbeddings = pgTable("ai_embeddings", {
  id: primaryKey(),
  targetId: uuid("target_id").notNull(),
  targetType: varchar("target_type", { length: 50 }).notNull(), // hotel, destination, post
  embedding: vector("embedding").notNull(),
  ...timestamps,
});

export const guardianPreferences = pgTable("guardian_preferences", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  voiceEnabled: boolean("voice_enabled").default(false).notNull(),
  guardianEnabled: boolean("guardian_enabled").default(true).notNull(),
  notificationLevel: varchar("notification_level", { length: 50 }).default('medium').notNull(),
  ...timestamps,
});

export const guardianMemories = pgTable("guardian_memories", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 100 }).notNull(), // e.g., 'hotel', 'food', 'pace'
  fact: text("fact").notNull(),
  confidence: numeric("confidence", { precision: 4, scale: 2 }),
  ...timestamps,
});

export const guardianInsights = pgTable("guardian_insights", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  period: varchar("period", { length: 50 }).notNull(), // 'daily', 'weekly', 'monthly'
  summary: text("summary").notNull(),
  metrics: jsonb("metrics"), // e.g., { avgSafetyScore: 95, distanceWalked: 10.5 }
  ...timestamps,
});

export const travelSummaries = pgTable("travel_summaries", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tripId: uuid("trip_id"), 
  date: varchar("date", { length: 25 }).notNull(),
  content: text("content").notNull(),
  achievements: jsonb("achievements"),
  ...timestamps,
});

export const recommendations = pgTable("recommendations", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(), // 'safety', 'rest', 'charge', 'route'
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).default('pending').notNull(), // 'pending', 'accepted', 'ignored'
  context: jsonb("context"),
  ...timestamps,
});

export const missionLogs = pgTable("mission_logs", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tripId: uuid("trip_id"),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  description: text("description").notNull(),
  severity: varchar("severity", { length: 50 }),
  metadata: jsonb("metadata"),
  ...timestamps,
});

export const weatherEvents = pgTable("weather_events", {
  id: primaryKey(),
  locationStr: varchar("location_str", { length: 255 }).notNull(),
  impact: varchar("impact", { length: 100 }).notNull(), // 'heavy_rain', 'high_uv'
  recommendation: text("recommendation").notNull(),
  expiresAt: varchar("expires_at", { length: 50 }),
  ...timestamps,
});

export const guardianSessions = pgTable("guardian_sessions", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 50 }).notNull(), // 'active', 'offline', 'ended'
  startedAt: varchar("started_at", { length: 50 }).notNull(),
  endedAt: varchar("ended_at", { length: 50 }),
  metadata: jsonb("metadata"),
  ...timestamps,
});
