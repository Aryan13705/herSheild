export type GuardianEventType = 
  | 'MISSION_STARTED'
  | 'MISSION_COMPLETED'
  | 'LOCATION_CHANGED'
  | 'SIGNIFICANT_LOCATION_CHANGED'
  | 'ENTERED_SAFE_ZONE'
  | 'EXITED_SAFE_ZONE'
  | 'ENTERED_RISK_ZONE'
  | 'EXITED_RISK_ZONE'
  | 'BATTERY_CHANGED'
  | 'BATTERY_LOW'
  | 'BATTERY_CRITICAL'
  | 'WEATHER_CHANGED'
  | 'OFFLINE_ENTERED'
  | 'OFFLINE_EXITED'
  | 'NETWORK_WEAK'
  | 'NETWORK_LOST'
  | 'PERMISSION_CHANGED'
  | 'EMERGENCY_TRIGGERED'
  | 'CHECKIN_DUE'
  | 'CHECKIN_MISSED'
  | 'DESTINATION_REACHED'
  | 'HOTEL_CHECKED_IN'
  | 'TRAVEL_STARTED'
  | 'TRAVEL_PAUSED'
  | 'TRAVEL_RESUMED'
  | 'TRAVEL_ENDED';

export interface GuardianEvent {
  type: GuardianEventType;
  payload: any;
  timestamp: Date;
}

type EventCallback = (event: GuardianEvent) => void;

export class GuardianEventBus {
  private listeners: Map<GuardianEventType, EventCallback[]> = new Map();

  public subscribe(eventType: GuardianEventType, callback: EventCallback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(callback);
  }

  public publish(event: GuardianEvent) {
    console.log(`[GuardianEventBus] Publishing event: ${event.type}`);
    const callbacks = this.listeners.get(event.type);
    if (callbacks) {
      callbacks.forEach(cb => cb(event));
    }
  }
}
