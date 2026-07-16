import { relations } from "drizzle-orm";
import { trips, itineraryDays, itineraryItems, travelJournals, journalEntries, journalMedia } from "./tables";
import { users } from "../iam/tables";

export const tripsRelations = relations(trips, ({ one, many }) => ({
  user: one(users, {
    fields: [trips.userId],
    references: [users.id],
  }),
  days: many(itineraryDays),
  journals: many(travelJournals),
}));

export const itineraryDaysRelations = relations(itineraryDays, ({ one, many }) => ({
  trip: one(trips, {
    fields: [itineraryDays.tripId],
    references: [trips.id],
  }),
  items: many(itineraryItems),
}));

export const itineraryItemsRelations = relations(itineraryItems, ({ one }) => ({
  day: one(itineraryDays, {
    fields: [itineraryItems.dayId],
    references: [itineraryDays.id],
  }),
}));

export const travelJournalsRelations = relations(travelJournals, ({ one, many }) => ({
  user: one(users, {
    fields: [travelJournals.userId],
    references: [users.id],
  }),
  trip: one(trips, {
    fields: [travelJournals.tripId],
    references: [trips.id],
  }),
  entries: many(journalEntries),
}));

export const journalEntriesRelations = relations(journalEntries, ({ one, many }) => ({
  journal: one(travelJournals, {
    fields: [journalEntries.journalId],
    references: [travelJournals.id],
  }),
  media: many(journalMedia),
}));

export const journalMediaRelations = relations(journalMedia, ({ one }) => ({
  entry: one(journalEntries, {
    fields: [journalMedia.entryId],
    references: [journalEntries.id],
  }),
}));
