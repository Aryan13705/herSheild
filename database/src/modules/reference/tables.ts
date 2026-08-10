import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { primaryKey } from "../../utils/uuid";
import { timestamps } from "../../utils/timestamps";

export const refCountries = pgTable("ref_countries", {
  id: primaryKey(),
  isoCode: varchar("iso_code", { length: 3 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  ...timestamps,
});

export const emergencyServices = pgTable("emergency_services", {
  id: primaryKey(),
  countryId: uuid("country_id").notNull().references(() => refCountries.id, { onDelete: "cascade" }),
  state: varchar("state", { length: 100 }),
  city: varchar("city", { length: 100 }),
  police: varchar("police", { length: 50 }),
  hospital: varchar("hospital", { length: 50 }),
  womensHelpline: varchar("womens_helpline", { length: 50 }),
  embassy: varchar("embassy", { length: 50 }),
  fireDepartment: varchar("fire_department", { length: 50 }),
  ...timestamps,
});
