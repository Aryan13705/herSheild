import { pgTable, varchar, uuid, text, integer } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps, softDelete } from "../../utils/timestamps";
import { users } from "../iam/tables";

export const posts = pgTable("posts", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }),
  content: text("content").notNull(),
  location: varchar("location", { length: 255 }),
  likesCount: integer("likes_count").default(0).notNull(),
  ...timestamps,
  ...softDelete,
});

export const comments = pgTable("comments", {
  id: primaryKey(),
  postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  likesCount: integer("likes_count").default(0).notNull(),
  ...timestamps,
  ...softDelete,
});

export const reviews = pgTable("reviews", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetId: uuid("target_id").notNull(), // Polymorphic or specific to locations/hotels
  targetType: varchar("target_type", { length: 50 }).notNull(),
  rating: integer("rating").notNull(),
  content: text("content"),
  ...timestamps,
  ...softDelete,
});
