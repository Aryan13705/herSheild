import { MissionSession, MissionState } from './MissionSession';
import { TimelineEngine } from '../timeline/TimelineEngine';

export class LiveMissionEngine {
  private activeSession: MissionSession | null = null;

  constructor(private timeline: TimelineEngine) {}

  public startMission(destination: { lat: number; lng: number }) {
    if (this.activeSession && this.activeSession.state === 'ACTIVE') {
      throw new Error("A mission is already active.");
    }
    
    this.activeSession = {
      id: `mission_${Date.now()}`,
      userId: 'current_user',
      state: 'ACTIVE',
      startTime: new Date(),
      destination,
      routeSegments: [],
      offlineMode: !navigator.onLine,
    };

    this.timeline.appendEvent(this.activeSession.id, 'MISSION_STARTED', 'Started journey to destination.');
    console.log(`[LiveMissionEngine] Mission ${this.activeSession.id} started.`);
  }

  public completeMission() {
    if (!this.activeSession) return;
    this.activeSession.state = 'COMPLETED';
    this.activeSession.endTime = new Date();
    this.timeline.appendEvent(this.activeSession.id, 'MISSION_COMPLETED', 'Arrived safely.');
    this.activeSession = null;
  }

  public getActiveSession(): MissionSession | null {
    return this.activeSession;
  }
}
