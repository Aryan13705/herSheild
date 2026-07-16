import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { auth } from "./config";

// Normally we'd import context from a central tRPC setup
type Context = { req: Request; resHeaders: Headers };
const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: ctx.req.headers });
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: session.user,
      session: session.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;

export const authTrpcRouter = t.router({
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
