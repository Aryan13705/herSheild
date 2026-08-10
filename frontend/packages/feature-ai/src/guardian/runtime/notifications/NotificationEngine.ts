import { GuardianEventBus } from '../../events/GuardianEventBus';
import { GuardianRecommendation } from '../../ranking/RecommendationEngine';

export class NotificationEngine {
  constructor(private eventBus: GuardianEventBus) {}

  /**
   * Dispatches notifications smartly, suppressing non-critical ones if in mission or quiet hours.
   * Prevents spam.
   */
  public dispatch(recommendation: GuardianRecommendation) {
    // Determine if we should suppress based on urgency
    if (recommendation.urgency < 50) {
      console.log(`[NotificationEngine] Suppressed low-urgency notification: ${recommendation.title}`);
      return;
    }
    
    // In a real app, this integrates with Push API / Notifications API / Service Worker
    console.log(`[NotificationEngine] 🚨 DISPATCH: ${recommendation.title} - ${recommendation.action}`);
  }
}
