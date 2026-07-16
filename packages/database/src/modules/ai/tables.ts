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
