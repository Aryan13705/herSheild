import { GuardianSkill } from './SkillInterface';
import { GuardianContext } from '../context/GuardianContextEngine';
import { AIProvider } from '../providers/AIProvider';
import { GuardianRecommendation } from '../ranking/RecommendationEngine';

export class SafetySkill implements GuardianSkill {
  name = 'SafetySkill';

  constructor(private provider: AIProvider) {}

  public async execute(context: GuardianContext, intentParameters: any): Promise<GuardianRecommendation[]> {
    console.log(`[SafetySkill] Executing with intent: ${intentParameters.intent}`);
    
    // Instead of LLM right now, use the mock provider to get a safe fallback
    const response = await this.provider.generateResponse({
      systemInstruction: "You are HerShield AI Guardian. Provide a safety recommendation.",
      userPrompt: `Current battery: ${context.batteryLevel}%. Active: ${context.isWalking ? 'walking' : 'idle'}.`
    });

    return [
      {
        id: 'rec_safety_1',
        title: 'Battery Conservation',
        action: 'Enable low power mode to ensure GPS tracking remains active.',
        urgency: intentParameters.severity || 50,
        reason: 'Your battery is dropping while walking, which is critical for location sharing.'
      }
    ];
  }

  public validate(output: any): boolean {
    if (!Array.isArray(output)) return false;
    return output.every(r => r.title && r.action && r.urgency !== undefined);
  }
}
