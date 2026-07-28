import { AIProvider, AIPromptRequest } from './AIProvider';

export class GeminiProvider implements AIProvider {
  readonly name = 'gemini';

  public async generateResponse(request: AIPromptRequest): Promise<string> {
    console.log(`[GeminiProvider] Generating response...`);
    // Placeholder for actual @google/genai SDK call
    return "Gemini Response: Safe to travel.";
  }
}
