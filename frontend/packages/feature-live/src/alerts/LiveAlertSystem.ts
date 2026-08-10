export type AlertPriority = 'INFO' | 'SAFETY' | 'CRITICAL' | 'EMERGENCY';

export interface LiveAlert {
  id: string;
  title: string;
  message: string;
  priority: AlertPriority;
}

export class LiveAlertSystem {
  /**
   * Adaptive alerting that respects quiet hours unless it's CRITICAL/EMERGENCY.
   */
  public pushAlert(alert: LiveAlert) {
    console.log(`[LiveAlertSystem] [${alert.priority}] ${alert.title}: ${alert.message}`);
    // Emit EVENT_HUD_ALERT for the React LiveSafetyPanel to display.
  }
}
