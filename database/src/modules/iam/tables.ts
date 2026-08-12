import { pgTable, varchar, boolean, inet, text, uuid, uniqueIndex, jsonb, index } from "drizzle-orm/pg-core";
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
}, (t) => ({
  userIdIdx: index("devices_user_id_idx").on(t.userId),
}));

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
}, (t) => ({
  userIdIdx: index("user_sessions_user_id_idx").on(t.userId),
  deviceIdIdx: index("user_sessions_device_id_idx").on(t.deviceId),
}));

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
  roleIdIdx: index("role_permissions_role_id_idx").on(t.roleId),
  permissionIdIdx: index("role_permissions_permission_id_idx").on(t.permissionId),
}));

export const travelPreferences = pgTable("travel_preferences", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  budgetLevel: varchar("budget_level", { length: 50 }),
  travelStyle: varchar("travel_style", { length: 50 }),
  interests: jsonb("interests"),
  accessibilityNeeds: jsonb("accessibility_needs"),
  preferredTransport: jsonb("preferred_transport"),
  soloTravelFrequency: varchar("solo_travel_frequency", { length: 50 }),
  nightTravelComfort: varchar("night_travel_comfort", { length: 50 }),
  adventureActivities: boolean("adventure_activities").default(false),
  ...timestamps,
});

export const savedPlaces = pgTable("saved_places", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  placeId: varchar("place_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 50 }), // FAVORITE, WISHLIST, RECENT
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  notes: text("notes"),
  ...timestamps,
}, (t) => ({
  userIdIdx: index("saved_places_user_id_idx").on(t.userId),
}));
