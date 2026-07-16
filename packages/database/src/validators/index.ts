import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "../modules/iam/tables";
import { safetyIncidents } from "../modules/safety/tables";
import { trips } from "../modules/trips/tables";
import { posts } from "../modules/community/tables";

// IAM Validation Schemas
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

// Safety Validation Schemas
export const insertSafetyIncidentSchema = createInsertSchema(safetyIncidents);
export const selectSafetyIncidentSchema = createSelectSchema(safetyIncidents);

// Trips Validation Schemas
export const insertTripSchema = createInsertSchema(trips);
export const selectTripSchema = createSelectSchema(trips);

// Community Validation Schemas
export const insertPostSchema = createInsertSchema(posts);
export const selectPostSchema = createSelectSchema(posts);
