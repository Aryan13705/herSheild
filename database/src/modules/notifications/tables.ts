import { pgTable, varchar, uuid, text, integer, boolean, jsonb, index } from "drizzle-orm/pg-core";
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
}, (t) => ({
  userIdIdx: index("notifications_user_id_idx").on(t.userId),
}));

export const notificationJobs = pgTable("notification_jobs", {
  id: primaryKey(),
  notificationId: uuid("notification_id").notNull().references(() => notifications.id, { onDelete: "cascade" }),
  provider: varchar("provider", { length: 100 }).notNull(), // APNs, FCM, Twilio
  status: notificationStatusEnum("status").default("PENDING").notNull(),
  retryCount: integer("retry_count").default(0).notNull(),
  ...timestamps,
}, (t) => ({
  notificationIdIdx: index("notification_jobs_notification_id_idx").on(t.notificationId),
}));

export const notificationLogs = pgTable("notification_logs", {
  id: primaryKey(),
  jobId: uuid("job_id").notNull().references(() => notificationJobs.id, { onDelete: "cascade" }),
  status: notificationStatusEnum("status").notNull(),
  providerResponse: text("provider_response"),
  ...timestamps,
}, (t) => ({
  jobIdIdx: index("notification_logs_job_id_idx").on(t.jobId),
}));
