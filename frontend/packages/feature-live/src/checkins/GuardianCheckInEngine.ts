import { LiveMissionEngine } from '../mission/LiveMissionEngine';

export class GuardianCheckInEngine {
  private checkInTimer: NodeJS.Timeout | null = null;

  constructor(private missionEngine: LiveMissionEngine) {}

  public scheduleCheckIn(minutesFromNow: number) {
    if (this.checkInTimer) clearTimeout(this.checkInTimer);
    
    console.log(`[CheckInEngine] Check-in scheduled in ${minutesFromNow} minutes.`);
    
    this.checkInTimer = setTimeout(() => {
      this.triggerCheckInPrompt();
    }, minutesFromNow * 60 * 1000);
  }

  private triggerCheckInPrompt() {
    const session = this.missionEngine.getActiveSession();
    if (!session) return;

    console.log(`[CheckInEngine] Prompting user for safety check-in!`);
    // Emit EVENT_CHECKIN_REQUIRED to trigger the UI HUD
  }

  public registerUserCheckIn() {
    if (this.checkInTimer) clearTimeout(this.checkInTimer);
    console.log(`[CheckInEngine] User checked in safely.`);
  }
}
