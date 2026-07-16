import { pgTable, varchar, boolean, inet, text, uuid, uniqueIndex } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps, softDelete } from "../../utils/timestamps";
import { roleEnum, verificationStatusEnum, platformEnum } from "../../enums";

export const users = pgTable("users", {
  id: primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: roleEnum("role").default("GUEST").notNull(),
  verificationStatus: verificationStatusEnum("verification_status").default("PENDING").notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  avatarUrl: text("avatar_url"),
  ...timestamps,
  ...softDelete,
});

export const devices = pgTable("devices", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  deviceName: varchar("device_name", { length: 255 }),
  platform: platformEnum("platform"),
  osVersion: varchar("os_version", { length: 50 }),
  appVersion: varchar("app_version", { length: 50 }),
  pushToken: varchar("push_token", { length: 255 }),
  isTrusted: boolean("is_trusted").default(false).notNull(),
  ...timestamps,
});

export const userSessions = pgTable("user_sessions", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  deviceId: uuid("device_id").references(() => devices.id, { onDelete: "set null" }),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  refreshToken: varchar("refresh_token", { length: 255 }).unique(),
  ipAddress: inet("ip_address"),
  userAgent: text("user_agent"),
  locationApprox: varchar("location_approx", { length: 255 }),
  expiresAt: timestamps.createdAt.notNull(),
  revokedAt: timestamps.createdAt,
  ...timestamps,
});

export const roles = pgTable("roles", {
  id: primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  ...timestamps,
});

export const permissions = pgTable("permissions", {
  id: primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  ...timestamps,
});

export const rolePermissions = pgTable("role_permissions", {
  id: primaryKey(),
  roleId: uuid("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  permissionId: uuid("permission_id").notNull().references(() => permissions.id, { onDelete: "cascade" }),
  ...timestamps,
}, (t) => ({
  unq: uniqueIndex("role_perm_unq").on(t.roleId, t.permissionId),
}));
