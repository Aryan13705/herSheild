export class TimelineEngine {
  public appendEvent(missionId: string, eventType: string, description: string) {
    console.log(`[Timeline - ${missionId}] ${eventType}: ${description}`);
  }
}
