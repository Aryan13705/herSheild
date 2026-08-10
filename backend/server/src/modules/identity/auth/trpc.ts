import { z } from "zod";
import { router, protectedProcedure } from "../../../trpc/init";

export const authTrpcRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  
  updatePreferences: protectedProcedure
    .input(z.object({ theme: z.string().optional(), language: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      // Logic to update user preferences in DB
      return { success: true };
    }),
});

