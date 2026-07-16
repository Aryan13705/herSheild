import { db, schema } from "@hershield/database";
import { eq } from "drizzle-orm";
import { auditService } from "./AuditService";

export class IdentityService {
  /**
   * Fully initializes a new HerShield identity across all bounded contexts.
   * Called automatically by Better Auth's `onUserCreated` hook.
   */
  async initializeIdentity(userId: string, email: string) {
    // 1. Assign Default Role (TRAVELER)
    const travelerRole = await db.query.roles.findFirst({
      where: eq(schema.roles.name, "TRAVELER")
    });

    if (travelerRole) {
      await db.insert(schema.rolePermissions).values({
        roleId: travelerRole.id,
        permissionId: travelerRole.id // Assuming basic setup, would map to real permissions
      }).onConflictDoNothing();
      
      // Update user with default role
      await db.update(schema.users).set({ role: "TRAVELER" }).where(eq(schema.users.id, userId));
    }

    // 2. We can initialize empty records for user preferences, privacy settings, etc here if they existed.

    // 3. Log Audit Event
    await auditService.logEvent({
      eventName: "USER_REGISTERED",
      actorId: userId,
      timestamp: new Date(),
      metadata: { email }
    });
  }
}

export const identityService = new IdentityService();
