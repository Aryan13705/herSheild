import { db } from "../client";
import { roles, permissions } from "../modules/iam/tables";
import { refCountries } from "../modules/reference/tables";
import { sql } from "drizzle-orm";

export async function seedDatabase() {
  console.log("Seeding database...");

  // Seed reference data (Countries)
  await db.insert(refCountries).values([
    { isoCode: "USA", name: "United States" },
    { isoCode: "GBR", name: "United Kingdom" },
    { isoCode: "IND", name: "India" }
  ]).onConflictDoNothing();

  // Seed basic roles
  await db.insert(roles).values([
    { name: "ADMIN", description: "Super Administrator" },
    { name: "MODERATOR", description: "Community Moderator" },
    { name: "VERIFIED_TRAVELER", description: "Verified Traveler" },
    { name: "TRAVELER", description: "Standard Traveler" },
    { name: "GUEST", description: "Guest User" }
  ]).onConflictDoNothing();

  console.log("Seeding complete.");
}
