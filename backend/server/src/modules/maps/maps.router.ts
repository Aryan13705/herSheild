import { router, protectedProcedure } from "../../trpc/init";
import { z } from "zod";
import { db } from "@hershield/database";
import { savedPlaces } from "@hershield/database/src/modules/iam/tables";
import { eq } from "drizzle-orm";

export const mapsRouter = router({
  savePlace: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
        name: z.string(),
        category: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [savedPlace] = await db
        .insert(savedPlaces)
        .values({
          userId: ctx.user.id,
          placeId: input.placeId,
          name: input.name,
          category: input.category,
          latitude: input.latitude,
          longitude: input.longitude,
          notes: input.notes,
        })
        .returning();
      return savedPlace;
    }),

  getSavedPlaces: protectedProcedure
    .query(async ({ ctx }) => {
      const places = await db
        .select()
        .from(savedPlaces)
        .where(eq(savedPlaces.userId, ctx.user.id));
      return places;
    }),

  deleteSavedPlace: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(savedPlaces)
        .where(eq(savedPlaces.id, input.id));
      return { success: true };
    }),
});
