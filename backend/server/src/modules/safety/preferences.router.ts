import { router, protectedProcedure } from "../../trpc/init";
import { z } from "zod";
import { db } from "@hershield/database";
import { userSafetyPreferences } from "@hershield/database/src/modules/safety/tables";
import { eq } from "drizzle-orm";

export const preferencesRouter = router({
  getPreferences: protectedProcedure.query(async ({ ctx }) => {
    const [prefs] = await db
      .select()
      .from(userSafetyPreferences)
      .where(eq(userSafetyPreferences.userId, ctx.user.id));
    return prefs || null;
  }),

  updatePreferences: protectedProcedure
    .input(
      z.object({
        offlineEnabled: z.string().optional(),
        checkinFrequency: z.enum(["HOURLY", "TWO_HOURS", "ARRIVAL", "CUSTOM"]).optional(),
        lowBatteryThreshold: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [existing] = await db
        .select()
        .from(userSafetyPreferences)
        .where(eq(userSafetyPreferences.userId, ctx.user.id));

      if (existing) {
        const [updated] = await db
          .update(userSafetyPreferences)
          .set(input)
          .where(eq(userSafetyPreferences.userId, ctx.user.id))
          .returning();
        return updated;
      } else {
        const [inserted] = await db
          .insert(userSafetyPreferences)
          .values({
            userId: ctx.user.id,
            ...input,
          })
          .returning();
        return inserted;
      }
    }),
});
