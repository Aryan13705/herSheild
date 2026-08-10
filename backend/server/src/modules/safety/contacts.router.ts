import { router, protectedProcedure } from "../../trpc/init";
import { z } from "zod";
import { db } from "@hershield/database";
import { emergencyContacts } from "@hershield/database/src/modules/safety/tables";
import { eq } from "drizzle-orm";

export const contactsRouter = router({
  getContacts: protectedProcedure.query(async ({ ctx }) => {
    const contacts = await db
      .select()
      .from(emergencyContacts)
      .where(eq(emergencyContacts.userId, ctx.user.id));
    return contacts;
  }),

  addContact: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        relationship: z.string().optional(),
        phone: z.string(),
        countryCode: z.string().optional(),
        priority: z.enum(["PRIMARY", "SECONDARY", "TERTIARY"]).default("PRIMARY"),
        preferredMethod: z.string().default("PHONE"),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [contact] = await db
        .insert(emergencyContacts)
        .values({
          userId: ctx.user.id,
          ...input,
        })
        .returning();
      return contact;
    }),

  updateContact: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        relationship: z.string().optional(),
        phone: z.string().optional(),
        countryCode: z.string().optional(),
        priority: z.enum(["PRIMARY", "SECONDARY", "TERTIARY"]).optional(),
        preferredMethod: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      const [contact] = await db
        .update(emergencyContacts)
        .set(updateData)
        .where(eq(emergencyContacts.id, id))
        .returning();
      return contact;
    }),

  deleteContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db.delete(emergencyContacts).where(eq(emergencyContacts.id, input.id));
      return { success: true };
    }),
});
