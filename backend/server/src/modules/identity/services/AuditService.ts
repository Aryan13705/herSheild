import { db, schema } from "@hershield/database";
import { IdentityEvent } from "../events";
import { pino } from "pino";

const logger = pino({ level: process.env.LOG_LEVEL || "info" });

export class AuditService {
  /**
   * Logs a strongly-typed identity event to both the application logger
   * and the highly-durable PostgreSQL `system_events` table (Event Sourcing).
   */
  async logEvent(event: IdentityEvent): Promise<void> {
    try {
      // 1. App-level logging (Datadog/CloudWatch)
      logger.info({
        event: event.eventName,
        actorId: event.actorId,
        targetId: event.targetId,
        metadata: event.metadata,
      });

      // 2. Database Event Sourcing for immutable audit trail
      await db.insert(schema.systemEvents).values({
        eventType: event.eventName,
        actorId: event.actorId,
        metadata: {
          targetId: event.targetId,
          ...event.metadata,
          ipAddress: event.ipAddress,
          userAgent: event.userAgent,
        },
      });
    } catch (error) {
      // Do not crash the auth flow if audit logging fails, but log the error
      logger.error("Failed to write audit log to database:", error);
    }
  }
}

export const auditService = new AuditService();
