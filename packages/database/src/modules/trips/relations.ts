import { relations } from "drizzle-orm";
import { trips, destinations, tripDestinations, tripPreferences, itineraryDays, itineraryItems, travelJournals, journalEntries, journalMedia } from "./tables";
import { users } from "../iam/tables";

export const tripsRelations = relations(trips, ({ one, many }) => ({
  user: one(users, {
    fields: [trips.userId],
    references: [users.id],
  }),
  tripDestinations: many(tripDestinations),
  preferences: one(tripPreferences, {
    fields: [trips.id],
    references: [tripPreferences.tripId],
  }),
  journals: many(travelJournals),
}));

export const destinationsRelations = relations(destinations, ({ many }) => ({
  tripDestinations: many(tripDestinations),
}));

export const tripDestinationsRelations = relations(tripDestinations, ({ one, many }) => ({
  trip: one(trips, {
    fields: [tripDestinations.tripId],
    references: [trips.id],
  }),
  destination: one(destinations, {
    fields: [tripDestinations.destinationId],
    references: [destinations.id],
  }),
  days: many(itineraryDays),
}));

export const tripPreferencesRelations = relations(tripPreferences, ({ one }) => ({
  trip: one(trips, {
    fields: [tripPreferences.tripId],
    references: [trips.id],
  }),
}));

export const itineraryDaysRelations = relations(itineraryDays, ({ one, many }) => ({
  tripDestination: one(tripDestinations, {
    fields: [itineraryDays.tripDestinationId],
    references: [tripDestinations.id],
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
