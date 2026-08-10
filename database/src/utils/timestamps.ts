import { timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`now()`)
    .notNull(),
};

export const softDelete = {
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
};
