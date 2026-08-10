import { BaseRepository } from "../../repositories/base";
import { trips, itineraryDays, itineraryItems } from "./tables";
import { eq } from "drizzle-orm";
import { db } from "../../client";

export class TripRepository extends BaseRepository<typeof trips, typeof trips.$inferInsert, typeof trips.$inferSelect> {
  constructor() {
    super(trips);
  }

  async getTripWithItinerary(tripId: string) {
    return db.query.trips.findFirst({
      where: eq(trips.id, tripId),
      with: {
        days: {
          with: {
            items: true
          }
        }
      }
    });
  }

  async addDay(data: typeof itineraryDays.$inferInsert) {
    const result = await db.insert(itineraryDays).values(data).returning();
    return result[0];
  }

  async addItem(data: typeof itineraryItems.$inferInsert) {
    const result = await db.insert(itineraryItems).values(data).returning();
    return result[0];
  }
}

export const tripRepository = new TripRepository();
