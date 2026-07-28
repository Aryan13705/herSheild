import { AIOrchestrator } from './router/AIOrchestrator';
import { ProviderRouter } from './router/ProviderRouter';
import { PromptEngine } from './prompts/PromptEngine';
import { Guardrails } from './guardrails/Guardrails';
import { CostOptimizer } from './billing/CostOptimizer';
import { RAGPipeline } from './rag/RAGPipeline';
import { VectorMemory } from './memory/VectorMemory';

// Mock memory for the demo
class MockMemory implements VectorMemory {
  async search(query: string, limit: number): Promise<string[]> {
    return [
      "Memory 1: User prefers well-lit areas.",
      "Memory 2: User walks at a moderate pace."
    ];
  }
  async store(text: string, metadata: any): Promise<void> {}
}

async function runDemo() {
  console.log("============== HER SHIELD ==============");
  console.log("🚀 Starting Guardian AI Orchestrator...");
  console.log("========================================");

  // Initialize the platform components
  const providerRouter = new ProviderRouter();
  const ragPipeline = new RAGPipeline(new MockMemory());
  const promptEngine = new PromptEngine(ragPipeline);
  const guardrails = new Guardrails();
  const costOptimizer = new CostOptimizer();

  // Initialize the orchestrator
  const orchestrator = new AIOrchestrator(
    providerRouter,
    promptEngine,
    guardrails,
    costOptimizer
  );

  try {
    console.log("\n[User]: Is it safe to walk home now?");
    console.log("[System]: Battery is at 15%. Location is Downtown.\n");
    
    // Execute a request through the orchestration pipeline
    const response = await orchestrator.execute({
      agentId: "agent_safety",
      userQuery: "Is it safe to walk home now?",
      context: { battery: 15, location: "Downtown" },
      requirement: "FAST"
    });

    console.log("\n✅ [Final Guardian Response]:");
    console.log(response);
    console.log("\n========================================");
  } catch (error) {
    console.error("❌ Orchestrator Error:", error);
  }
}

runDemo();
