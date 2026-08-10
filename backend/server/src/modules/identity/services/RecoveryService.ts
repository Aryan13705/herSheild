import { db, schema } from "@hershield/database";
import { eq } from "drizzle-orm";
import { auditService } from "./AuditService";

export class RecoveryService {
  /**
   * Invoked after Better Auth successfully resets a password.
   */
  async handlePasswordReset(userId: string) {
    // Proactively revoke all previous sessions for security
    await db.update(schema.userSessions)
      .set({ revokedAt: new Date() })
      .where(eq(schema.userSessions.userId, userId));

    await auditService.logEvent({
      eventName: "PASSWORD_RESET",
      actorId: userId,
      timestamp: new Date(),
    });
  }
}

export const recoveryService = new RecoveryService();
