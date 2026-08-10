import { pgTable, varchar, uuid, text, numeric, geometry, jsonb } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps, softDelete } from "../../utils/timestamps";
import {
  incidentTypeEnum,
  incidentStatusEnum,
  mediaTypeEnum,
  contactPriorityEnum,
  checkinFrequencyEnum,
  checkinStatusEnum,
  reportCategoryEnum,
  reportSeverityEnum,
  permissionStatusEnum,
  notificationTypeEnum
} from "../../enums";
import { users } from "../iam/tables";

export const safetyIncidents = pgTable("safety_incidents", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: incidentTypeEnum("type").notNull(),
  status: incidentStatusEnum("status").default("ACTIVE").notNull(),
  description: text("description"),
  locationApprox: geometry("location_approx", { type: "point", mode: "tuple", srid: 4326 }),
  resolvedAt: timestamps.updatedAt,
  ...timestamps,
  ...softDelete,
});

export const locationPings = pgTable("location_pings", {
  id: primaryKey(),
  incidentId: uuid("incident_id").references(() => safetyIncidents.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  geom: geometry("geom", { type: "point", mode: "tuple", srid: 4326 }).notNull(),
  batteryLevel: numeric("battery_level"),
  networkStatus: varchar("network_status", { length: 50 }),
  ...timestamps,
});

export const sosEvidence = pgTable("sos_evidence", {
  id: primaryKey(),
  incidentId: uuid("incident_id").notNull().references(() => safetyIncidents.id, { onDelete: "restrict" }),
  mediaType: mediaTypeEnum("media_type").notNull(),
  fileUrl: varchar("file_url", { length: 2048 }).notNull(),
  transcript: text("transcript"),
  metadata: jsonb("metadata"),
  ...timestamps,
});

export const locationSafetyScores = pgTable("location_safety_scores", {
  id: primaryKey(),
  geom: geometry("geom", { type: "polygon", srid: 4326 }).notNull(),
  safetyScore: numeric("safety_score").notNull(),
  confidenceLevel: numeric("confidence_level"),
  source: varchar("source", { length: 100 }), // AI, CROWDSOURCE, OFFICIAL
  ...timestamps,
});

export const guardians = pgTable("guardians", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  guardianUserId: uuid("guardian_user_id").references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 50 }),
  email: varchar("email", { length: 255 }),
  status: varchar("status", { length: 50 }).default("PENDING").notNull(),
  ...timestamps,
});

export const guardianSessions = pgTable("guardian_sessions", {
  id: primaryKey(),
  guardianId: uuid("guardian_id").notNull().references(() => guardians.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamps.createdAt.notNull(),
  ...timestamps,
});

export const emergencyContacts = pgTable("emergency_contacts", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  relationship: varchar("relationship", { length: 100 }),
  phone: varchar("phone", { length: 50 }).notNull(),
  countryCode: varchar("country_code", { length: 10 }),
  priority: contactPriorityEnum("priority").default("PRIMARY").notNull(),
  preferredMethod: varchar("preferred_method", { length: 50 }).default("PHONE").notNull(),
  notes: text("notes"),
  ...timestamps,
});

export const emergencyCards = pgTable("emergency_cards", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  bloodGroup: varchar("blood_group", { length: 10 }),
  medicalConditions: text("medical_conditions"),
  allergies: text("allergies"),
  currentHotel: varchar("current_hotel", { length: 255 }),
  currentTripId: uuid("current_trip_id"), // Will reference trips table once built
  nationality: varchar("nationality", { length: 100 }),
  insuranceNumber: varchar("insurance_number", { length: 100 }),
  passportNumber: varchar("passport_number", { length: 100 }),
  photoUrl: varchar("photo_url", { length: 2048 }),
  ...timestamps,
});

export const userSafetyPreferences = pgTable("user_safety_preferences", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  offlineEnabled: varchar("offline_enabled", { length: 10 }).default("TRUE").notNull(), // boolean stored as string/varchar or boolean? Let's use boolean type? Wait, Drizzle has boolean.
  checkinFrequency: checkinFrequencyEnum("checkin_frequency").default("HOURLY").notNull(),
  lowBatteryThreshold: numeric("low_battery_threshold").default("20").notNull(),
  ...timestamps,
});

export const safetyCheckins = pgTable("safety_checkins", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: checkinStatusEnum("status").default("PENDING").notNull(),
  scheduledFor: timestamps.createdAt.notNull(),
  confirmedAt: timestamps.updatedAt,
  location: geometry("location", { type: "point", mode: "tuple", srid: 4326 }),
  ...timestamps,
});

export const safetyReports = pgTable("safety_reports", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  category: reportCategoryEnum("category").notNull(),
  severity: reportSeverityEnum("severity").default("MEDIUM").notNull(),
  notes: text("notes"),
  location: geometry("location", { type: "point", mode: "tuple", srid: 4326 }).notNull(),
  reportedAt: timestamps.createdAt.notNull(),
  ...timestamps,
});

export const cachedSafetyLocations = pgTable("cached_safety_locations", {
  id: primaryKey(),
  syncId: varchar("sync_id", { length: 255 }).notNull().unique(),
  locationData: jsonb("location_data").notNull(),
  lastSynced: timestamps.createdAt.notNull(),
  ...timestamps,
});

export const safetyNotifications = pgTable("safety_notifications", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: notificationTypeEnum("type").notNull(),
  payload: jsonb("payload"),
  readAt: timestamps.updatedAt,
  ...timestamps,
});

export const emergencyEvents = pgTable("emergency_events", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: incidentTypeEnum("type").notNull(),
  triggeredAt: timestamps.createdAt.notNull(),
  resolvedAt: timestamps.updatedAt,
  ...timestamps,
});

export const permissionHistory = pgTable("permission_history", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  permissionType: varchar("permission_type", { length: 100 }).notNull(),
  status: permissionStatusEnum("status").notNull(),
  lastUpdated: timestamps.updatedAt,
  ...timestamps,
});

export const safetyScores = pgTable("safety_scores", {
  id: primaryKey(),
  region: varchar("region", { length: 255 }).notNull(),
  score: numeric("score").notNull(),
  factors: jsonb("factors"),
  generatedAt: timestamps.createdAt.notNull(),
  ...timestamps,
});
