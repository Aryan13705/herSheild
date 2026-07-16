import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["GUEST", "TRAVELER", "VERIFIED_TRAVELER", "MODERATOR", "ADMIN", "SUPER_ADMIN"]);
export const platformEnum = pgEnum("platform", ["IOS", "ANDROID", "WEB"]);
export const deviceTypeEnum = pgEnum("device_type", ["SMARTPHONE", "TABLET", "WATCH", "DESKTOP"]);
export const verificationStatusEnum = pgEnum("verification_status", ["PENDING", "APPROVED", "REJECTED", "BANNED"]);
export const incidentTypeEnum = pgEnum("incident_type", ["SOS", "MEDICAL", "POLICE", "SCAM", "HARASSMENT"]);
export const incidentStatusEnum = pgEnum("incident_status", ["ACTIVE", "RESOLVED", "FALSE_ALARM"]);
export const notificationTypeEnum = pgEnum("notification_type", ["PUSH", "EMAIL", "SMS", "IN_APP"]);
export const notificationStatusEnum = pgEnum("notification_status", ["PENDING", "PROCESSING", "DELIVERED", "FAILED"]);
export const safetyLevelEnum = pgEnum("safety_level", ["SAFE", "CAUTION", "HIGH_RISK"]);
export const mediaTypeEnum = pgEnum("media_type", ["IMAGE", "VIDEO", "AUDIO", "DOCUMENT"]);
export const travelModeEnum = pgEnum("travel_mode", ["SOLO", "GROUP", "BUSINESS", "LEISURE"]);
export const tripStatusEnum = pgEnum("trip_status", ["PLANNING", "ACTIVE", "COMPLETED", "CANCELLED"]);
