import { pgTable, varchar, integer, boolean, text, uuid, jsonb } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps } from "../../utils/timestamps";
import { users } from "../iam/tables";

export const userProfiles = pgTable("user_profiles", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  dateOfBirth: varchar("date_of_birth", { length: 20 }),
  gender: varchar("gender", { length: 50 }),
  country: varchar("country", { length: 100 }),
  state: varchar("state", { length: 100 }),
  city: varchar("city", { length: 100 }),
  occupation: varchar("occupation", { length: 100 }),
  preferredLanguage: varchar("preferred_language", { length: 50 }).default('en'),
  bloodGroup: varchar("blood_group", { length: 10 }),
  medicalNotes: text("medical_notes"),
  ...timestamps,
});

export const guardianPreferences = pgTable("guardian_preferences", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  sosCountdownSeconds: integer("sos_countdown_seconds").default(10).notNull(),
  checkInFrequencyMins: integer("check_in_frequency_mins").default(60).notNull(),
  guardianVoice: varchar("guardian_voice", { length: 50 }).default('empathetic'),
  autoMissionDetection: boolean("auto_mission_detection").default(true).notNull(),
  locationSharingLevel: varchar("location_sharing_level", { length: 50 }).default('trusted_only'),
  trustedContactSharing: boolean("trusted_contact_sharing").default(true).notNull(),
  privacyLevel: varchar("privacy_level", { length: 50 }).default('balanced'),
  emergencyBehavior: varchar("emergency_behavior", { length: 50 }).default('escalate_immediately'),
  ...timestamps,
});

export const profileCompletion = pgTable("profile_completion", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  completionPercentage: integer("completion_percentage").default(0).notNull(),
  completedSections: jsonb("completed_sections").$type<string[]>().default([]).notNull(),
  lastUpdated: timestamps.updatedAt,
  ...timestamps,
});
