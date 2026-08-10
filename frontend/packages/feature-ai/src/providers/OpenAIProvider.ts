import { AIProvider, AIPromptRequest } from './AIProvider';

export class OpenAIProvider implements AIProvider {
  readonly name = 'openai';

  public async generateResponse(request: AIPromptRequest): Promise<string> {
    console.log(`[OpenAIProvider] Generating response...`);
    // Placeholder for actual openai SDK call
    return "OpenAI Response: Proceed with caution.";
  }
}
