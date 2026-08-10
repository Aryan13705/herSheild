import { MissionSession } from '../mission/MissionSession';

export class MissionRecoveryEngine {
  private storageKey = 'hershield_active_mission';

  /**
   * Persists the mission to localStorage/IndexedDB so it survives a refresh.
   */
  public saveSession(session: MissionSession) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(session));
    }
  }

  /**
   * Restores an active mission if the user refreshes or reconnects.
   */
  public recoverSession(): MissionSession | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      console.log(`[MissionRecoveryEngine] Recovered active mission session.`);
      return JSON.parse(stored);
    }
    return null;
  }
}
