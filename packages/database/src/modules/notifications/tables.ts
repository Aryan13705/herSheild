import { pgTable, varchar, uuid, text, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps } from "../../utils/timestamps";
import { notificationTypeEnum, notificationStatusEnum } from "../../enums";
import { users } from "../iam/tables";

export const notifications = pgTable("notifications", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  type: notificationTypeEnum("type").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  metadata: jsonb("metadata"),
  ...timestamps,
});

export const notificationJobs = pgTable("notification_jobs", {
  id: primaryKey(),
  notificationId: uuid("notification_id").notNull().references(() => notifications.id, { onDelete: "cascade" }),
  provider: varchar("provider", { length: 100 }).notNull(), // APNs, FCM, Twilio
  status: notificationStatusEnum("status").default("PENDING").notNull(),
  retryCount: integer("retry_count").default(0).notNull(),
  ...timestamps,
});

export const notificationLogs = pgTable("notification_logs", {
  id: primaryKey(),
  jobId: uuid("job_id").notNull().references(() => notificationJobs.id, { onDelete: "cascade" }),
  status: notificationStatusEnum("status").notNull(),
  providerResponse: text("provider_response"),
  ...timestamps,
});
