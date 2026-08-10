export interface LocationPoint {
  lat: number;
  lng: number;
}

export interface Destination {
  id: string;
  name: string;
  location: LocationPoint;
}

export interface TimelineEvent {
  id: string;
  type: string;
  scheduledTime: string;
  status: 'pending' | 'active' | 'completed';
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high';
  factors: string[];
  lastUpdated: string;
}

export interface Mission {
  id: string;
  userId: string;
  objectives: string[];
  destinations: Destination[];
  offlinePackId?: string;
  safetyGoals: string[];
  timeline: TimelineEvent[];
  guardianStatus: 'active' | 'standby' | 'offline';
  riskAssessment: RiskAssessment;
  progress: number;
}
