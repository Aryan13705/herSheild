export interface AIPromptRequest {
  systemInstruction: string;
  userPrompt: string;
  temperature?: number;
}

export interface AIProvider {
  readonly name: string;
  generateResponse(request: AIPromptRequest): Promise<string>;
}
