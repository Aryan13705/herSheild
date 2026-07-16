import { relations } from "drizzle-orm";
import { notifications, notificationJobs, notificationLogs } from "./tables";
import { users } from "../iam/tables";

export const notificationsRelations = relations(notifications, ({ one, many }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  jobs: many(notificationJobs),
}));

export const notificationJobsRelations = relations(notificationJobs, ({ one, many }) => ({
  notification: one(notifications, {
    fields: [notificationJobs.notificationId],
    references: [notifications.id],
  }),
  logs: many(notificationLogs),
}));

export const notificationLogsRelations = relations(notificationLogs, ({ one }) => ({
  job: one(notificationJobs, {
    fields: [notificationLogs.jobId],
    references: [notificationJobs.id],
  }),
}));
