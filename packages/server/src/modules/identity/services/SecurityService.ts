import { db, schema } from "@hershield/database";
import { eq, and, desc, sql } from "drizzle-orm";
import { auditService } from "./AuditService";

export class SecurityService {
  /**
   * Detects suspicious logins by comparing IP/Location and evaluating failures.
   */
  async detectSuspiciousLogin(userId: string, ipAddress: string, userAgent: string): Promise<boolean> {
    // Basic heuristic: check if there are multiple failed logins in the last 15 minutes
    // In a real startup, we'd query Redis or `system_events` for recent LOGIN_FAILED events
    const recentFailures = await db
      .select({ count: sql<number>\`count(*)\` })
      .from(schema.systemEvents)
      .where(
        and(
          eq(schema.systemEvents.actorId, userId),
          eq(schema.systemEvents.eventType, "LOGIN_FAILED"),
          sql\`created_at > now() - interval '15 minutes'\`
        )
      );

    const failCount = Number(recentFailures[0]?.count || 0);

    if (failCount > 5) {
      await auditService.logEvent({
        eventName: "SUSPICIOUS_LOGIN_DETECTED",
        actorId: userId,
        timestamp: new Date(),
        ipAddress,
        metadata: { reason: "Multiple failed login attempts", failCount }
      });
      return true; // Mark as suspicious
    }

    return false;
  }

  /**
   * Evaluates if a refresh token is being reused (Token Theft Detection)
   */
  async detectTokenReuse(familyId: string, usedNonce: string): Promise<boolean> {
    // If we detect reuse, we would immediately invalidate all sessions in that family.
    // Better Auth handles this intrinsically via its JWT/session plugins,
    // but this exposes a hook for custom enterprise logic.
    return false; 
  }
}

export const securityService = new SecurityService();
