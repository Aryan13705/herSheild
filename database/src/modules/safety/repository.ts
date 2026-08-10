import { BaseRepository } from "../../repositories/base";
import { safetyIncidents, locationPings, sosEvidence } from "./tables";
import { eq } from "drizzle-orm";
import { db } from "../../client";

export class SafetyRepository extends BaseRepository<typeof safetyIncidents, typeof safetyIncidents.$inferInsert, typeof safetyIncidents.$inferSelect> {
  constructor() {
    super(safetyIncidents);
  }

  async getActiveIncidents(userId: string) {
    return db.select().from(this.table as any).where(
      and(eq((this.table as any).userId, userId), eq((this.table as any).status, "ACTIVE"))
    );
  }

  async recordLocationPing(data: typeof locationPings.$inferInsert) {
    const result = await db.insert(locationPings).values(data).returning();
    return result[0];
  }

  async addEvidence(data: typeof sosEvidence.$inferInsert) {
    const result = await db.insert(sosEvidence).values(data).returning();
    return result[0];
  }
}

export const safetyRepository = new SafetyRepository();
