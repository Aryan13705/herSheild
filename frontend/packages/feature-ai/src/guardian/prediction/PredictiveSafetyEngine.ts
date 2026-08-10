import { GuardianContext } from '../context/GuardianContextEngine';

export interface SafetyPrediction {
  id: string;
  type: 'battery_problem' | 'weather_risk' | 'connectivity_loss' | 'unsafe_area' | 'long_walk';
  message: string;
  probability: number; // 0.0 to 1.0
}

export class PredictiveSafetyEngine {
  /**
   * Proactively predicts future risks based on current context.
   */
  public predictRisks(context: GuardianContext): SafetyPrediction[] {
    const predictions: SafetyPrediction[] = [];

    // Battery Prediction Example
    if (context.batteryLevel < 20 && context.isWalking) {
      predictions.push({
        id: 'pred_batt_1',
        type: 'battery_problem',
        message: 'Battery may not last until arrival at current walking pace.',
        probability: 0.85
      });
    }

    // Connectivity Prediction Example
    if (context.currentCity === 'RemoteArea' && !context.isOffline) {
      predictions.push({
        id: 'pred_conn_1',
        type: 'connectivity_loss',
        message: 'You may lose network within the next 5 km.',
        probability: 0.70
      });
    }

    return predictions;
  }
}
