import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "../modules/identity/auth/config";

export const createTRPCContext = async (opts: { req: Request }) => {
  return {
    req: opts.req,
    resHeaders: new Headers(),
  };
};

export const t = initTRPC.context<typeof createTRPCContext>().create();

/**
 * DEMO_MODE: Set DEMO_MODE=true in your environment to enable a named demo user
 * for local development without Firebase credentials.
 * NEVER enabled in production (NODE_ENV=production always requires real auth).
 */
const DEMO_MODE =
  process.env.DEMO_MODE === "true" &&
  process.env.NODE_ENV !== "production";

const DEMO_USER = {
  id: "demo-user-hershield",
  name: "Demo User",
  email: "demo@hershield.app",
};

export const isAuthed = t.middleware(async ({ ctx, next }) => {
  const authHeader = ctx.req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  // ── DEMO MODE (explicit opt-in only, never in production) ──────────────────
  if (!token && DEMO_MODE) {
    console.warn("[TRPC] DEMO_MODE active — using demo user. Set DEMO_MODE=false for real auth.");
    return next({
      ctx: {
        user: DEMO_USER,
        session: null,
      },
    });
  }

  // ── No token and not in DEMO_MODE ──────────────────────────────────────────
  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No authorization token provided. Set DEMO_MODE=true for local development without Firebase.",
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
  } catch (_err) {
    // In DEMO_MODE, allow token verification failures (e.g., Firebase emulator)
    if (DEMO_MODE) {
      console.warn("[TRPC] Token verification failed in DEMO_MODE — using demo user.");
      return next({
        ctx: {
          user: DEMO_USER,
          session: null,
        },
      });
    }
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired token." });
  }
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const createCallerFactory = t.createCallerFactory;
export const router = t.router;

