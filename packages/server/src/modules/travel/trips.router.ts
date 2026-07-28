import { z } from "zod";
import { protectedProcedure, router } from "../../trpc/init";
import { TRPCError } from "@trpc/server";

export const tripsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    // Return mock data until we link full DB client
    return [
      {
        id: "1",
        title: "Solo Paris Getaway",
        status: "PLANNING",
        startDate: "2026-08-10",
        endDate: "2026-08-20",
        primaryDestination: "Paris, France"
      }
    ];
  }),
  
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      startDate: z.string(),
      endDate: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Mock create
      return { id: "2", ...input, status: "PLANNING" };
    }),
});
