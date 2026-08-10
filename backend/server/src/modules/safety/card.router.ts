import { router, protectedProcedure } from "../../trpc/init";
import { z } from "zod";
import { db } from "@hershield/database";
import { emergencyCards } from "@hershield/database/src/modules/safety/tables";
import { eq } from "drizzle-orm";

export const cardRouter = router({
  getCard: protectedProcedure.query(async ({ ctx }) => {
    const [card] = await db
      .select()
      .from(emergencyCards)
      .where(eq(emergencyCards.userId, ctx.user.id));
    return card || null;
  }),

  upsertCard: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        bloodGroup: z.string().optional(),
        medicalConditions: z.string().optional(),
        allergies: z.string().optional(),
        currentHotel: z.string().optional(),
        nationality: z.string().optional(),
        insuranceNumber: z.string().optional(),
        passportNumber: z.string().optional(),
        photoUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [existing] = await db
        .select()
        .from(emergencyCards)
        .where(eq(emergencyCards.userId, ctx.user.id));

      if (existing) {
        const [updated] = await db
          .update(emergencyCards)
          .set(input)
          .where(eq(emergencyCards.userId, ctx.user.id))
          .returning();
        return updated;
      } else {
        const [inserted] = await db
          .insert(emergencyCards)
          .values({
            userId: ctx.user.id,
            ...input,
          })
          .returning();
        return inserted;
      }
    }),
});
