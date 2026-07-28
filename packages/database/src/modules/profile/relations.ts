import { relations } from "drizzle-orm";
import { users } from "../iam/tables";
import { userProfiles, emergencyContacts, guardianPreferences, profileCompletion } from "./tables";

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const emergencyContactsRelations = relations(emergencyContacts, ({ one }) => ({
  user: one(users, {
    fields: [emergencyContacts.userId],
    references: [users.id],
  }),
}));

export const guardianPreferencesRelations = relations(guardianPreferences, ({ one }) => ({
  user: one(users, {
    fields: [guardianPreferences.userId],
    references: [users.id],
  }),
}));

export const profileCompletionRelations = relations(profileCompletion, ({ one }) => ({
  user: one(users, {
    fields: [profileCompletion.userId],
    references: [users.id],
  }),
}));

export const usersProfileRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  guardianPreferences: one(guardianPreferences, {
    fields: [users.id],
    references: [guardianPreferences.userId],
  }),
  profileCompletion: one(profileCompletion, {
    fields: [users.id],
    references: [profileCompletion.userId],
  }),
  emergencyContacts: many(emergencyContacts),
}));
