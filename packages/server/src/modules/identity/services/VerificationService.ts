import { db, schema } from "@hershield/database";
import { eq } from "drizzle-orm";
import { auditService } from "./AuditService";

export class VerificationService {
  /**
   * Better Auth handles the token generation and email sending internally.
   * This service is invoked upon successful email verification to update custom architecture state.
   */
  async handleEmailVerified(userId: string) {
    await db.update(schema.users)
      .set({ verificationStatus: "APPROVED" }) // Map to our DB architecture
      .where(eq(schema.users.id, userId));

    await auditService.logEvent({
      eventName: "EMAIL_VERIFIED",
      actorId: userId,
      timestamp: new Date()
    });
  }
}

export const verificationService = new VerificationService();
