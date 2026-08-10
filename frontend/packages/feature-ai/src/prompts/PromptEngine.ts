import { RAGPipeline } from '../rag/RAGPipeline';

export interface FinalPrompt {
  system: string;
  user: string;
}

export class PromptEngine {
  constructor(private rag: RAGPipeline) {}

  /**
   * Centralized prompt system. Never hardcode prompts across the app.
   * Dynamically injects Context, Memory, Mission, and RAG retrieval.
   */
  public async build(agentId: string, userQuery: string, context: any): Promise<FinalPrompt> {
    const memoryContext = await this.rag.retrieve(userQuery);
    
    return {
      system: `You are HerShield Guardian.\\n\\nRetrieved Knowledge:\\n${memoryContext}\\n\\nStrict policies apply.`,
      user: `${userQuery}`
    };
  }
}
