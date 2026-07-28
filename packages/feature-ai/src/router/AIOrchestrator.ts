import { ProviderRouter, ModelRequirement } from './ProviderRouter';
import { PromptEngine } from '../prompts/PromptEngine';
import { Guardrails } from '../guardrails/Guardrails';
import { CostOptimizer } from '../billing/CostOptimizer';

export interface OrchestrationRequest {
  agentId: string;
  userQuery: string;
  context: any;
  requirement: ModelRequirement;
}

export class AIOrchestrator {
  constructor(
    private providerRouter: ProviderRouter,
    private promptEngine: PromptEngine,
    private guardrails: Guardrails,
    private costOptimizer: CostOptimizer
  ) {}

  public async execute(request: OrchestrationRequest): Promise<string> {
    console.log(`[AIOrchestrator] Executing task for agent: ${request.agentId}`);
    
    // 1. Guardrails (Input Moderation)
    if (!this.guardrails.isSafeInput(request.userQuery)) {
      throw new Error("Unsafe input rejected by Guardrails.");
    }

    // 2. Prompt Engine (Injects RAG / Memory / Mission Context)
    const prompt = await this.promptEngine.build(request.agentId, request.userQuery, request.context);

    // 3. Provider Router
    let provider = this.providerRouter.getProvider(request.requirement);
    
    // 4. Execution with Fallback
    let response = '';
    try {
      response = await provider.generateResponse({ systemInstruction: prompt.system, userPrompt: prompt.user });
    } catch (e) {
      console.warn(`[AIOrchestrator] Provider ${provider.name} failed. Attempting fallback...`);
      provider = this.providerRouter.getFallbackProvider(provider.name);
      response = await provider.generateResponse({ systemInstruction: prompt.system, userPrompt: prompt.user });
    }

    // 5. Output Validation
    if (!this.guardrails.isSafeOutput(response)) {
      throw new Error("Unsafe output rejected by Guardrails.");
    }

    // 6. Cost Tracking
    this.costOptimizer.trackUsage(provider.name, prompt.user.length, response.length);

    return response;
  }
}
