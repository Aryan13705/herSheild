export interface AIPromptRequest {
  systemInstruction: string;
  userPrompt: string;
  temperature?: number;
}

export interface AIProvider {
  generateResponse(request: AIPromptRequest): Promise<string>;
  generateStructuredResponse<T>(request: AIPromptRequest, schema: any): Promise<T>;
}

export class MockAIProvider implements AIProvider {
  public async generateResponse(request: AIPromptRequest): Promise<string> {
    return "This is a mock response from the Guardian.";
  }

  public async generateStructuredResponse<T>(request: AIPromptRequest, schema: any): Promise<T> {
    return {} as T;
  }
}
