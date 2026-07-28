import { router, protectedProcedure } from "../../trpc/init";
import { z } from "zod";
import { db } from "@hershield/database";
import { safetyReports } from "@hershield/database/src/modules/safety/tables";
import { eq, desc } from "drizzle-orm";

export const reportsRouter = router({
  getReports: protectedProcedure.query(async ({ ctx }) => {
    return await db
      .select()
      .from(safetyReports)
      .where(eq(safetyReports.userId, ctx.user.id))
      .orderBy(desc(safetyReports.reportedAt));
  }),

  submitReport: protectedProcedure
    .input(
      z.object({
        category: z.enum(["HARASSMENT", "UNSAFE_AREA", "ROAD_BLOCK", "MEDICAL_EMERGENCY", "LOST", "SUSPICIOUS_ACTIVITY", "POOR_LIGHTING", "UNSAFE_TRANSPORT"]),
        severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
        notes: z.string().optional(),
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { latitude, longitude, ...rest } = input;
      const [report] = await db
        .insert(safetyReports)
        .values({
          userId: ctx.user.id,
          ...rest,
          location: [longitude, latitude], // geometry point mode tuple is [lon, lat]
        })
        .returning();
      return report;
    }),
});
