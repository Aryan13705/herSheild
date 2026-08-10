import { router, protectedProcedure } from "../../trpc/init";
import { z } from "zod";
import { db } from "@hershield/database";
import { safetyCheckins } from "@hershield/database/src/modules/safety/tables";
import { eq, desc } from "drizzle-orm";

export const checkinsRouter = router({
  getUpcomingCheckin: protectedProcedure.query(async ({ ctx }) => {
    const [checkin] = await db
      .select()
      .from(safetyCheckins)
      .where(eq(safetyCheckins.userId, ctx.user.id))
      .orderBy(desc(safetyCheckins.scheduledFor))
      .limit(1);
    return checkin || null;
  }),

  scheduleCheckin: protectedProcedure
    .input(z.object({ scheduledFor: z.date() }))
    .mutation(async ({ ctx, input }) => {
      const [checkin] = await db
        .insert(safetyCheckins)
        .values({
          userId: ctx.user.id,
          scheduledFor: input.scheduledFor,
          status: "PENDING",
        })
        .returning();
      return checkin;
    }),

  confirmCheckin: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, latitude, longitude } = input;
      const location = latitude && longitude ? [longitude, latitude] : undefined;

      const [checkin] = await db
        .update(safetyCheckins)
        .set({
          status: "CONFIRMED",
          confirmedAt: new Date(),
          location: location as [number, number] | undefined,
        })
        .where(eq(safetyCheckins.id, id))
        .returning();
      return checkin;
    }),
});
