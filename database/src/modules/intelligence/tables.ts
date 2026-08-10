import { pgTable, varchar, text, timestamp, boolean, jsonb, real, geometry, uuid, index } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps } from "../../utils/timestamps";
import { users } from "../iam/tables";

// Engine 12: Mission Intelligence
export const missions = pgTable("missions", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // WEEKEND_TRIP, OFFICE_COMMUTE, NIGHT_WALK, VACATION
  status: varchar("status", { length: 50 }).default("ACTIVE").notNull(), // ACTIVE, COMPLETED, CANCELLED, SOS
  startTime: timestamp("start_time", { withTimezone: true }).defaultNow(),
  endTime: timestamp("end_time", { withTimezone: true }),
  destinationGeom: geometry("destination_geom", { type: "point", mode: "tuple", srid: 4326 }),
  eta: timestamp("eta", { withTimezone: true }),
  metadata: jsonb("metadata"), // checkpoints, objectives
  ...timestamps,
}, (table) => {
  return {
    userIdIdx: index("missions_user_id_idx").on(table.userId),
    statusIdx: index("missions_status_idx").on(table.status),
  };
});

// Engine 4: Smart Itinerary Intelligence
export const smartItineraries = pgTable("smart_itineraries", {
  id: primaryKey(),
  missionId: uuid("mission_id").notNull().references(() => missions.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  itineraryData: jsonb("itinerary_data").notNull(), 
  adapted: boolean("adapted").default(false), 
  ...timestamps,
}, (table) => {
  return {
    missionIdIdx: index("smart_itineraries_mission_id_idx").on(table.missionId),
    userIdIdx: index("smart_itineraries_user_id_idx").on(table.userId),
  };
});

// Engine 5: Local Intelligence (POI Safety)
export const localPoiSafety = pgTable("local_poi_safety", {
  id: primaryKey(),
  poiType: text("poi_type").notNull(),
  name: text("name").notNull(),
  locationApprox: text("location_approx"),
  safetyScore: real("safety_score").notNull(),
  verified: boolean("verified").default(false),
  metadata: jsonb("metadata"),
  ...timestamps,
});

// Engine 6: Transport Intelligence
export const transportComparisons = pgTable("transport_comparisons", {
  id: primaryKey(),
  routeHash: text("route_hash").notNull().unique(),
  options: jsonb("options").notNull(), 
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  ...timestamps,
});

// Engine 7: Accommodation Intelligence
export const accommodationSafetyScores = pgTable("accommodation_safety_scores", {
  id: primaryKey(),
  propertyId: text("property_id").notNull().unique(),
  safetyRating: real("safety_rating").notNull(),
  reviewCount: real("review_count").notNull(),
  neighborhoodSafety: real("neighborhood_safety").notNull(),
  ...timestamps,
});

// Engine 8: Community Intelligence
export const communityCircles = pgTable("community_circles", {
  id: primaryKey(),
  creatorId: uuid("creator_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  isVerifiedOnly: boolean("is_verified_only").default(true),
  ...timestamps,
});

export const circleMembers = pgTable("circle_members", {
  id: primaryKey(),
  circleId: uuid("circle_id").notNull().references(() => communityCircles.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 50 }).default("MEMBER").notNull(),
  ...timestamps,
});

// Engine 9: Health Intelligence
export const healthMetrics = pgTable("health_metrics", {
  id: primaryKey(),
  missionId: uuid("mission_id").references(() => missions.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  hydrationRemindersEnabled: boolean("hydration_reminders_enabled").default(true),
  uvIndexExposure: real("uv_index_exposure"),
  airQualityExposure: real("air_quality_exposure"),
  ...timestamps,
});

// Engine 10: Financial Intelligence
export const financialBudgets = pgTable("financial_budgets", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  missionId: uuid("mission_id").references(() => missions.id, { onDelete: "cascade" }),
  dailyLimit: real("daily_limit"),
  currency: text("currency").default("USD"),
  currentSpent: real("current_spent").default(0),
  ...timestamps,
});

// Engine 14: Learning Intelligence
export const learningProfiles = pgTable("learning_profiles", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  preferredTransport: text("preferred_transport"),
  riskTolerance: text("risk_tolerance"),
  frequentRoutes: jsonb("frequent_routes"),
  ...timestamps,
});
