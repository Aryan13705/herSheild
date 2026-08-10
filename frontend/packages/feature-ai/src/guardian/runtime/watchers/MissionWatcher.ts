import { GuardianEventBus } from '../../events/GuardianEventBus';

export class MissionWatcher {
  constructor(private eventBus: GuardianEventBus) {}

  public startMission(missionId: string) {
    this.eventBus.publish({ type: 'MISSION_STARTED', payload: { missionId }, timestamp: new Date() });
  }

  public completeMission(missionId: string) {
    this.eventBus.publish({ type: 'MISSION_COMPLETED', payload: { missionId }, timestamp: new Date() });
  }
}
