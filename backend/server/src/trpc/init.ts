import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "../modules/identity/auth/config";

export const createTRPCContext = async (opts: { req: Request }) => {
  return {
    req: opts.req,
    resHeaders: new Headers(),
  };
};

export const t = initTRPC.context<typeof createTRPCContext>().create();

export const isAuthed = t.middleware(async ({ ctx, next }) => {
  const authHeader = ctx.req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No authorization token provided.",
    });
  }

  // ── Verify Firebase token ──────────────────────────────────────────────────
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return next({
      ctx: {
        user: {
          id: decodedToken.uid,
          email: decodedToken.email ?? "",
          name: (decodedToken.name as string | undefined) ?? "",
        },
        session: null,
      },
    });
  } catch (err) {
    console.error("[TRPC] Firebase token verification failed", {
      code: err instanceof Error && "code" in err ? String(err.code) : "unknown",
      message: err instanceof Error ? err.message : "Unknown authentication error",
      environment: process.env.NODE_ENV,
    });
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired token." });
  }
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const createCallerFactory = t.createCallerFactory;
export const router = t.router;
