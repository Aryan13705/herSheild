import { db, schema } from "@hershield/database";
import { eq, and } from "drizzle-orm";
import { auditService } from "./AuditService";

export class DeviceService {
  async registerDevice(userId: string, deviceName: string, platform: any, pushToken?: string) {
    const [device] = await db.insert(schema.devices).values({
      userId,
      deviceName,
      platform,
      pushToken,
      isTrusted: false, // Must be explicitly verified via MFA/Email in the future
    }).returning();

    await auditService.logEvent({
      eventName: "DEVICE_REGISTERED",
      actorId: userId,
      timestamp: new Date(),
      metadata: { deviceId: device.id, platform },
    });

    return device;
  }

  async getDevicesForUser(userId: string) {
    return db.query.devices.findMany({
      where: eq(schema.devices.userId, userId),
    });
  }

  async revokeDevice(deviceId: string, userId: string) {
    await db.delete(schema.devices).where(
      and(eq(schema.devices.id, deviceId), eq(schema.devices.userId, userId))
    );
    // Also revoke all sessions tied to this device
    await db.update(schema.userSessions)
      .set({ revokedAt: new Date() })
      .where(eq(schema.userSessions.deviceId, deviceId));
  }
}

export const deviceService = new DeviceService();
