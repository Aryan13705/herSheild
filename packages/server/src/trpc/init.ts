import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { auth } from "../modules/identity/auth/config";

type Context = {
  req: Request;
  resHeaders: Headers;
};

export const t = initTRPC.context<Context>().create();

export const isAuthed = t.middleware(async ({ ctx, next }) => {
  const isDev = process.env.NODE_ENV === "development";
  const authHeader = ctx.req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  
  // In development with no token, use a mock user to unblock UI development
  if (!token) {
    if (isDev) {
      return next({
        ctx: {
          user: { id: "mock-user-1", name: "Aanya", email: "aanya@example.com" },
          session: null,
        } as any,
      });
    }
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return next({
      ctx: {
        user: {
          id: decodedToken.uid,
          email: decodedToken.email || "",
          name: decodedToken.name || "",
        },
        session: null,
      },
    });
  } catch (error) {
    // In development, fall back to mock user even if token verification fails
    if (isDev) {
      console.warn("[TRPC] Token verification failed in dev, using mock user.");
      return next({
        ctx: {
          user: { id: "mock-user-1", name: "Aanya", email: "aanya@example.com" },
          session: null,
        } as any,
      });
    }
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
  }
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const createCallerFactory = t.createCallerFactory;
export const router = t.router;

