import { Mission } from '../types/Mission';

export interface GuardianContext {
  missionActive: boolean;
  batteryLevel: number;
  weatherCondition: string;
  isOffline: boolean;
  currentCity: string;
  isWalking: boolean;
  safetyScore: number;
  nearestHospitalDist?: number;
  nearestPoliceDist?: number;
  currentMission?: Mission;
}

export class GuardianContextEngine {
  /**
   * Synthesizes raw application state into a lightweight context object
   * to prevent sending raw application logic/state directly to the AI.
   */
  public async buildContext(rawState: any): Promise<GuardianContext> {
    return {
      missionActive: !!rawState.activeMission,
      batteryLevel: rawState.device?.battery ?? 100,
      weatherCondition: rawState.weather?.current ?? 'clear',
      isOffline: rawState.network?.offline ?? false,
      currentCity: rawState.location?.city ?? 'Unknown',
      isWalking: rawState.activity?.type === 'walking',
      safetyScore: rawState.safety?.overallScore ?? 100,
      nearestHospitalDist: rawState.places?.hospital?.distance,
      nearestPoliceDist: rawState.places?.police?.distance,
      currentMission: rawState.activeMission,
    };
  }
}
