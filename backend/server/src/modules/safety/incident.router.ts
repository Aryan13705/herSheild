import { z } from "zod";
import { router, publicProcedure } from "../../trpc/init";
import { safetyIncidents, locationPings } from "@hershield/database/src/modules/safety/tables";
import { db } from "@hershield/database";
import { eq, desc } from "drizzle-orm";

export const incidentRouter = router({
  // Simulate SOS from user
  triggerSOS: publicProcedure
    .input(z.object({
      userId: z.string().uuid(),
      description: z.string().optional(),
      lat: z.number(),
      lng: z.number()
    }))
    .mutation(async ({ input }) => {
      // Create a new ACTIVE incident
      const [incident] = await db.insert(safetyIncidents).values({
        userId: input.userId,
        type: "SOS",
        status: "ACTIVE",
        description: input.description || "Emergency SOS triggered",
        locationApprox: [input.lng, input.lat]
      }).returning();

      // Log initial location
      await db.insert(locationPings).values({
        incidentId: incident.id,
        userId: input.userId,
        geom: [input.lng, input.lat],
        networkStatus: "good"
      });

      return incident;
    }),

  // Get active incidents for Admin Portal
  getActiveIncidents: publicProcedure
    .query(async () => {
      // In a real app we'd join with the users table to get the user's name
      // and only return incidents where status === "ACTIVE"
      return db.select().from(safetyIncidents)
        .where(eq(safetyIncidents.status, "ACTIVE"))
        .orderBy(desc(safetyIncidents.createdAt));
    }),

  // Mark incident as resolved
  resolveIncident: publicProcedure
    .input(z.object({
      incidentId: z.string().uuid()
    }))
    .mutation(async ({ input }) => {
      return db.update(safetyIncidents)
        .set({ status: "RESOLVED", resolvedAt: new Date() })
        .where(eq(safetyIncidents.id, input.incidentId))
        .returning();
    })
});
