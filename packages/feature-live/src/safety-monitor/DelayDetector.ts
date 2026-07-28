export class DelayDetector {
  /**
   * Detects if the user is taking significantly longer than expected to reach checkpoints.
   */
  public analyze(startTime: Date, expectedDurationMs: number) {
    const elapsed = Date.now() - startTime.getTime();
    
    // 50% delay threshold
    if (elapsed > expectedDurationMs * 1.5) {
      console.log(`[DelayDetector] Unusual delay detected!`);
      // Emit EVENT_UNUSUAL_DELAY
    }
  }
}
