import { relations } from "drizzle-orm";
import { safetyIncidents, locationPings, sosEvidence, guardians, guardianSessions } from "./tables";
import { users } from "../iam/tables";

export const safetyIncidentsRelations = relations(safetyIncidents, ({ one, many }) => ({
  user: one(users, {
    fields: [safetyIncidents.userId],
    references: [users.id],
  }),
  locationPings: many(locationPings),
  evidence: many(sosEvidence),
}));

export const locationPingsRelations = relations(locationPings, ({ one }) => ({
  incident: one(safetyIncidents, {
    fields: [locationPings.incidentId],
    references: [safetyIncidents.id],
  }),
  user: one(users, {
    fields: [locationPings.userId],
    references: [users.id],
  }),
}));

export const sosEvidenceRelations = relations(sosEvidence, ({ one }) => ({
  incident: one(safetyIncidents, {
    fields: [sosEvidence.incidentId],
    references: [safetyIncidents.id],
  }),
}));

export const guardiansRelations = relations(guardians, ({ one, many }) => ({
  user: one(users, {
    fields: [guardians.userId],
    references: [users.id],
    relationName: "assignedGuardians",
  }),
  guardianUser: one(users, {
    fields: [guardians.guardianUserId],
    references: [users.id],
    relationName: "actingAsGuardian",
  }),
  sessions: many(guardianSessions),
}));

export const guardianSessionsRelations = relations(guardianSessions, ({ one }) => ({
  guardian: one(guardians, {
    fields: [guardianSessions.guardianId],
    references: [guardians.id],
  }),
  user: one(users, {
    fields: [guardianSessions.userId],
    references: [users.id],
  }),
}));
