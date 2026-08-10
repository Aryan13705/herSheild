import { GuardianContext } from '../context/GuardianContextEngine';

export interface GuardianRecommendation {
  id: string;
  title: string;
  action: string;
  urgency: number; // 1-100
  reason?: string;
}

export class RecommendationEngine {
  /**
   * Ranks recommendations based on Urgency and Context, returning top 3.
   * Ensures the user is never overwhelmed.
   */
  public rankRecommendations(recs: GuardianRecommendation[], context: GuardianContext): GuardianRecommendation[] {
    // Sort by urgency descending
    const sorted = [...recs].sort((a, b) => b.urgency - a.urgency);
    
    // Display maximum Three recommendations
    return sorted.slice(0, 3);
  }
}
