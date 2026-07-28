export class InactivityDetector {
  /**
   * Detects if the user hasn't moved for a long time during an active walk.
   */
  public analyze(lastKnownLocationTimestamp: Date) {
    const elapsed = Date.now() - lastKnownLocationTimestamp.getTime();
    
    // 5 minutes without location change
    if (elapsed > 5 * 60 * 1000) { 
      console.log(`[InactivityDetector] Prolonged inactivity detected!`);
      // Emit EVENT_PROLONGED_INACTIVITY
    }
  }
}
