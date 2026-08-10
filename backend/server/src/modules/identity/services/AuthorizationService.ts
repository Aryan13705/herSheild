import { permissionCache } from "../cache";

export type Action = "create" | "read" | "update" | "delete" | "execute";
export type Resource = "Trips" | "Guardian" | "Community" | "SOS" | "Profile";

export class AuthorizationService {
  /**
   * Policy-based authorization evaluation.
   * Separates AuthN (who you are) from AuthZ (what you can do).
   */
  async can(userId: string, action: Action, resource: Resource): Promise<boolean> {
    // Check cache first
    const cacheKey = `perms:${userId}`;
    let permissions = await permissionCache.get(cacheKey);

    if (!permissions) {
      // In a real implementation, we would query the `role_permissions` join table
      // based on the user's assigned role in the `users` table.
      // For this architecture scaffold, we simulate the retrieval.
      permissions = ["Trips:create", "Trips:read", "Profile:update"];
      await permissionCache.set(cacheKey, permissions, 300); // 5 minute TTL
    }

    // Super Admin override could go here
    return permissions.includes(`${resource}:${action}`);
  }

  async authorize(userId: string, action: Action, resource: Resource): Promise<void> {
    const isAllowed = await this.can(userId, action, resource);
    if (!isAllowed) {
      throw new Error("Forbidden: You do not have permission to perform this action.");
    }
  }
}

export const authorizationService = new AuthorizationService();
