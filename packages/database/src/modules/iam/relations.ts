import { relations } from "drizzle-orm";
import { users, devices, userSessions, roles, permissions, rolePermissions, travelPreferences, savedPlaces } from "./tables";

export const usersRelations = relations(users, ({ one, many }) => ({
  devices: many(devices),
  sessions: many(userSessions),
  travelPreferences: one(travelPreferences, {
    fields: [users.id],
    references: [travelPreferences.userId],
  }),
  savedPlaces: many(savedPlaces),
}));

export const travelPreferencesRelations = relations(travelPreferences, ({ one }) => ({
  user: one(users, {
    fields: [travelPreferences.userId],
    references: [users.id],
  }),
}));

export const savedPlacesRelations = relations(savedPlaces, ({ one }) => ({
  user: one(users, {
    fields: [savedPlaces.userId],
    references: [users.id],
  }),
}));

export const devicesRelations = relations(devices, ({ one, many }) => ({
  user: one(users, {
    fields: [devices.userId],
    references: [users.id],
  }),
  sessions: many(userSessions),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
  device: one(devices, {
    fields: [userSessions.deviceId],
    references: [devices.id],
  }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(roles, {
    fields: [rolePermissions.roleId],
    references: [roles.id],
  }),
  permission: one(permissions, {
    fields: [rolePermissions.permissionId],
    references: [permissions.id],
  }),
}));
