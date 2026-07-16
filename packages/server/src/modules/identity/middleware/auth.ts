import { Context, Next } from "hono";
import { auth } from "../auth/config";
import { authenticationService } from "../services/AuthenticationService";
import { getCookie } from "hono/cookie";

export const requireAuth = async (c: Context, next: Next) => {
  // Better Auth expects full Node/Fetch Request. We can use hono context req.
  // Alternatively, extract token manually to use internal service.
  const sessionToken = getCookie(c, "better-auth.session_token") || c.req.header("Authorization")?.replace("Bearer ", "");

  if (!sessionToken) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const ip = c.req.header("x-forwarded-for") || "unknown";
  const userAgent = c.req.header("user-agent") || "unknown";

  const session = await authenticationService.validateSession(sessionToken, ip, userAgent);

  if (!session) {
    return c.json({ error: "Unauthorized or session expired" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);

  await next();
};

export const optionalAuth = async (c: Context, next: Next) => {
  const sessionToken = getCookie(c, "better-auth.session_token") || c.req.header("Authorization")?.replace("Bearer ", "");

  if (sessionToken) {
    const ip = c.req.header("x-forwarded-for") || "unknown";
    const userAgent = c.req.header("user-agent") || "unknown";
    const session = await authenticationService.validateSession(sessionToken, ip, userAgent);
    
    if (session) {
      c.set("user", session.user);
      c.set("session", session.session);
    }
  }

  await next();
};
