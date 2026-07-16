import { pgTable, varchar, uuid, text, numeric, geometry, jsonb } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps, softDelete } from "../../utils/timestamps";
import { incidentTypeEnum, incidentStatusEnum, mediaTypeEnum } from "../../enums";
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
