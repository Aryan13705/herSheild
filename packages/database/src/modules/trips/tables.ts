import { pgTable, varchar, date, uuid, text, integer, jsonb } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps, softDelete } from "../../utils/timestamps";
import { tripStatusEnum, travelModeEnum } from "../../enums";
import { users } from "../iam/tables";

export const trips = pgTable("trips", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  destination: varchar("destination", { length: 255 }).notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  status: tripStatusEnum("status").default("PLANNING").notNull(),
  travelMode: travelModeEnum("travel_mode").default("SOLO").notNull(),
  ...timestamps,
  ...softDelete,
});

export const itineraryDays = pgTable("itinerary_days", {
  id: primaryKey(),
  tripId: uuid("trip_id").notNull().references(() => trips.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  dayIndex: integer("day_index").notNull(),
  title: varchar("title", { length: 255 }),
  notes: text("notes"),
  ...timestamps,
});

export const itineraryItems = pgTable("itinerary_items", {
  id: primaryKey(),
  dayId: uuid("day_id").notNull().references(() => itineraryDays.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 50 }).notNull(), // FLIGHT, HOTEL, ACTIVITY, etc.
  startTime: timestamps.createdAt,
  endTime: timestamps.createdAt,
  location: varchar("location", { length: 255 }),
  metadata: jsonb("metadata"),
  ...timestamps,
});

export const travelJournals = pgTable("travel_journals", {
  id: primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tripId: uuid("trip_id").references(() => trips.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  visibility: varchar("visibility", { length: 50 }).default("PRIVATE").notNull(),
  ...timestamps,
});

export const journalEntries = pgTable("journal_entries", {
  id: primaryKey(),
  journalId: uuid("journal_id").notNull().references(() => travelJournals.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }),
  content: text("content").notNull(),
  aiSummary: text("ai_summary"),
  ...timestamps,
});

export const journalMedia = pgTable("journal_media", {
  id: primaryKey(),
  entryId: uuid("entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
  fileUrl: varchar("file_url", { length: 2048 }).notNull(),
  mediaType: varchar("media_type", { length: 50 }).notNull(),
  ...timestamps,
});
