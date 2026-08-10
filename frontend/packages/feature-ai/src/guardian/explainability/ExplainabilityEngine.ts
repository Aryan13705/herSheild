import { GuardianRecommendation } from '../ranking/RecommendationEngine';

export class ExplainabilityEngine {
  /**
   * Ensures every recommendation has a clear reason.
   */
  public attachReason(recommendation: GuardianRecommendation, reasonText: string): GuardianRecommendation {
    return {
      ...recommendation,
      reason: reasonText
    };
  }
  
  /**
   * Validates that all recommendations have an explainable reason attached.
   */
  public validateExplainability(recs: GuardianRecommendation[]): boolean {
    return recs.every(r => !!r.reason && r.reason.length >= 10);
  }
}
