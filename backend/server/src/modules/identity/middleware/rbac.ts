import { Context, Next } from "hono";
import { authorizationService, Action, Resource } from "../services/AuthorizationService";

export const requirePolicy = (action: Action, resource: Resource) => {
  return async (c: Context, next: Next) => {
    const user = c.get("user");
    
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    try {
      await authorizationService.authorize(user.id, action, resource);
      await next();
    } catch (error: any) {
      return c.json({ error: error.message }, 403);
    }
  };
};

export const requireRole = (allowedRoles: string[]) => {
  return async (c: Context, next: Next) => {
    const user = c.get("user");
    
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // `user.role` is exposed if schema mapped correctly, else fetch from db
    if (!allowedRoles.includes(user.role)) {
      return c.json({ error: "Forbidden: Invalid Role" }, 403);
    }

    await next();
  };
};
