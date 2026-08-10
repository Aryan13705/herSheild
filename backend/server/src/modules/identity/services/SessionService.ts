import { db, schema } from "@hershield/database";
import { eq } from "drizzle-orm";
import { sessionCache } from "../cache";
import { auditService } from "./AuditService";

export class SessionService {
  /**
   * Hook for Better Auth to sync active sessions into our enriched `user_sessions` table
   */
  async syncSession(sessionToken: string, userId: string, deviceId?: string, ip?: string, ua?: string) {
    const existing = await db.query.userSessions.findFirst({
      where: eq(schema.userSessions.sessionToken, sessionToken)
    });

    if (!existing) {
      await db.insert(schema.userSessions).values({
        userId,
        deviceId,
        sessionToken,
        ipAddress: ip,
        userAgent: ua,
      });

      await auditService.logEvent({
        eventName: "SESSION_CREATED",
        actorId: userId,
        timestamp: new Date(),
        ipAddress: ip,
      });
    }
  }

  async revokeSession(sessionToken: string, userId: string) {
    await db.update(schema.userSessions)
      .set({ revokedAt: new Date() })
      .where(eq(schema.userSessions.sessionToken, sessionToken));

    await sessionCache.delete(`session:${sessionToken}`);

    await auditService.logEvent({
      eventName: "SESSION_REVOKED",
      actorId: userId,
      timestamp: new Date(),
    });
  }
}

export const sessionService = new SessionService();
