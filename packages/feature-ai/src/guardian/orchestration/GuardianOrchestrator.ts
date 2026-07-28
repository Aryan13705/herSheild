import { GuardianContextEngine } from '../context/GuardianContextEngine';
import { GuardianDecisionEngine } from '../decision/GuardianDecisionEngine';
import { RecommendationEngine } from '../ranking/RecommendationEngine';
import { AIProvider } from '../providers/AIProvider';
import { GuardianSkill } from '../skills/SkillInterface';

export class GuardianOrchestrator {
  constructor(
    private contextEngine: GuardianContextEngine,
    private decisionEngine: GuardianDecisionEngine,
    private recommendationEngine: RecommendationEngine,
    private provider: AIProvider,
    private skills: Map<string, GuardianSkill>
  ) {}

  public async handleEvent(eventName: string, rawState: any) {
    console.log(`[Orchestrator] Handling event: ${eventName}`);
    
    const startTime = Date.now();

    // 1. Context Engine: Abstract app state
    const context = await this.contextEngine.buildContext(rawState);

    // 2. Decision Engine: Determine intent without LLM
    const decision = this.decisionEngine.evaluate(eventName, context);

    // 3. Skill Selection
    const skill = this.skills.get(decision.selectedSkill);
    if (!skill) {
      throw new Error(`Skill ${decision.selectedSkill} not found`);
    }

    // 4 & 5. Prompt Builder & AI Provider handled inside Skill implementation
    const result = await skill.execute(context, decision);

    // 6. Response Validation
    if (!skill.validate(result)) {
      console.warn(`[Orchestrator] Validation failed for skill ${skill.name}. Triggering fallback.`);
      return [{ title: "Guardian Online", action: "Stay aware of your surroundings.", urgency: 10, reason: "Fallback safety check." }];
    }

    // 7. Recommendation Ranking
    let finalOutput = result;
    if (Array.isArray(result) && result.length > 0 && result[0].urgency !== undefined) {
      finalOutput = this.recommendationEngine.rankRecommendations(result, context);
    }
    
    const duration = Date.now() - startTime;
    console.log(`[Orchestrator] Finished in ${duration}ms`);

    return finalOutput;
  }
}
