import { GuardianContext } from '../context/GuardianContextEngine';

export enum GuardianIntent {
  LOW_BATTERY = 'LOW_BATTERY',
  ENTERING_LOW_LIGHT_AREA = 'ENTERING_LOW_LIGHT_AREA',
  HEAVY_RAIN = 'HEAVY_RAIN',
  OFFLINE_SOON = 'OFFLINE_SOON',
  CHECKIN_DUE = 'CHECKIN_DUE',
  MISSION_STARTED = 'MISSION_STARTED',
  MISSION_COMPLETED = 'MISSION_COMPLETED',
  NEARBY_HOSPITAL = 'NEARBY_HOSPITAL',
  SAFE_ROUTE_CHANGED = 'SAFE_ROUTE_CHANGED',
  HIGH_RISK_AREA = 'HIGH_RISK_AREA',
  GENERAL_ADVICE = 'GENERAL_ADVICE'
}

export interface GuardianDecision {
  intent: GuardianIntent;
  priority: 'low' | 'medium' | 'high' | 'critical';
  selectedSkill: string;
  severity: number;
}

export class GuardianDecisionEngine {
  /**
   * Determines the intent and skill path based on an event and context.
   * This ensures the LLM never decides business logic.
   */
  public evaluate(eventName: string, context: GuardianContext): GuardianDecision {
    switch (eventName) {
      case 'BATTERY_LOW':
        return {
          intent: GuardianIntent.LOW_BATTERY,
          priority: context.batteryLevel < 10 ? 'critical' : 'high',
          selectedSkill: 'SafetySkill',
          severity: 80,
        };
      case 'NETWORK_DROP_PREDICTED':
        return {
          intent: GuardianIntent.OFFLINE_SOON,
          priority: 'high',
          selectedSkill: 'OfflineSkill',
          severity: 60,
        };
      case 'MISSION_START':
        return {
          intent: GuardianIntent.MISSION_STARTED,
          priority: 'low',
          selectedSkill: 'MissionSummarySkill',
          severity: 20,
        };
      case 'WEATHER_ALERT':
        return {
          intent: GuardianIntent.HEAVY_RAIN,
          priority: 'medium',
          selectedSkill: 'WeatherSkill',
          severity: 50,
        };
      default:
        return {
          intent: GuardianIntent.GENERAL_ADVICE,
          priority: 'low',
          selectedSkill: 'RecommendationSkill',
          severity: 10,
        };
    }
  }
}
