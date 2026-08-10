export type IdentityEventName =
  | "USER_REGISTERED"
  | "EMAIL_VERIFIED"
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "SESSION_CREATED"
  | "SESSION_REVOKED"
  | "DEVICE_REGISTERED"
  | "ROLE_CHANGED"
  | "PASSWORD_RESET"
  | "SUSPICIOUS_LOGIN_DETECTED";

export interface BaseIdentityEvent<T = any> {
  eventName: IdentityEventName;
  actorId?: string; // e.g., the user performing the action
  targetId?: string; // e.g., the user being affected
  timestamp: Date;
  metadata?: T;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserRegisteredEvent extends BaseIdentityEvent<{ email: string }> {
  eventName: "USER_REGISTERED";
}

// Additional specific event types can be defined here and discriminated
export type IdentityEvent = BaseIdentityEvent<any>;
