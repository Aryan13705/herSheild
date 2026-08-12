import { pgTable, varchar, date, uuid, text, integer, jsonb, index } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps, softDelete } from "../../utils/timestamps";
import { tripStatusEnum, travelModeEnum } from "../../enums";
import { users } from "../iam/tables";
import { refCountries } from "../reference/tables";

export const trips = pgTable("trips", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  destination: varchar("destination", { length: 255 }), // Legacy/primary label
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  status: tripStatusEnum("status").default("PLANNING").notNull(),
  travelMode: travelModeEnum("travel_mode").default("SOLO").notNull(),
  ...timestamps,
  ...softDelete,
}, (t) => ({
  userIdIdx: index("trips_user_id_idx").on(t.userId),
}));

export const destinations = pgTable("destinations", {
  id: primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  countryId: uuid("country_id").references(() => refCountries.id, { onDelete: "set null" }),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  placeId: varchar("place_id", { length: 255 }),
  ...timestamps,
}, (t) => ({
  countryIdIdx: index("destinations_country_id_idx").on(t.countryId),
}));

export const tripDestinations = pgTable("trip_destinations", {
  id: primaryKey(),
  tripId: uuid("trip_id").notNull().references(() => trips.id, { onDelete: "cascade" }),
  destinationId: uuid("destination_id").notNull().references(() => destinations.id, { onDelete: "cascade" }),
  orderIndex: integer("order_index").notNull(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  ...timestamps,
}, (t) => ({
  tripIdIdx: index("trip_destinations_trip_id_idx").on(t.tripId),
  destinationIdIdx: index("trip_destinations_destination_id_idx").on(t.destinationId),
}));

export const tripPreferences = pgTable("trip_preferences", {
  id: primaryKey(),
  tripId: uuid("trip_id").notNull().references(() => trips.id, { onDelete: "cascade" }).unique(),
  budget: integer("budget"),
  currency: varchar("currency", { length: 3 }).default("USD"),
  pace: varchar("pace", { length: 50 }).default("MODERATE"),
  interests: jsonb("interests"),
  ...timestamps,
});

export const itineraryDays = pgTable("itinerary_days", {
  id: primaryKey(),
  tripDestinationId: uuid("trip_destination_id").notNull().references(() => tripDestinations.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  dayIndex: integer("day_index").notNull(),
  title: varchar("title", { length: 255 }),
  notes: text("notes"),
  ...timestamps,
}, (t) => ({
  tripDestinationIdIdx: index("itinerary_days_trip_destination_id_idx").on(t.tripDestinationId),
}));

export const itineraryItems = pgTable("itinerary_items", {
  id: primaryKey(),
  dayId: uuid("day_id").notNull().references(() => itineraryDays.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 50 }).notNull(), // FLIGHT, HOTEL, ACTIVITY, etc.
  cost: integer("cost"),
  currency: varchar("currency", { length: 3 }).default("USD"),
  startTime: timestamps.createdAt,
  endTime: timestamps.createdAt,
  location: varchar("location", { length: 255 }),
  metadata: jsonb("metadata"),
  ...timestamps,
}, (t) => ({
  dayIdIdx: index("itinerary_items_day_id_idx").on(t.dayId),
}));

export const travelJournals = pgTable("travel_journals", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tripId: uuid("trip_id").references(() => trips.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  visibility: varchar("visibility", { length: 50 }).default("PRIVATE").notNull(),
  ...timestamps,
}, (t) => ({
  userIdIdx: index("travel_journals_user_id_idx").on(t.userId),
  tripIdIdx: index("travel_journals_trip_id_idx").on(t.tripId),
}));

export const journalEntries = pgTable("journal_entries", {
  id: primaryKey(),
  journalId: uuid("journal_id").notNull().references(() => travelJournals.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }),
  content: text("content").notNull(),
  aiSummary: text("ai_summary"),
  ...timestamps,
}, (t) => ({
  journalIdIdx: index("journal_entries_journal_id_idx").on(t.journalId),
}));

export const journalMedia = pgTable("journal_media", {
  id: primaryKey(),
  entryId: uuid("entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
  fileUrl: varchar("file_url", { length: 2048 }).notNull(),
  mediaType: varchar("media_type", { length: 50 }).notNull(),
  ...timestamps,
}, (t) => ({
  entryIdIdx: index("journal_media_entry_id_idx").on(t.entryId),
}));
