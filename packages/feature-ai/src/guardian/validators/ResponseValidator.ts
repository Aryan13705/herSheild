export class ResponseValidator {
  /**
   * Validates raw LLM string output for safety and hallucination risks.
   * Never expose raw LLM output directly without this check.
   */
  public isSafe(response: string): boolean {
    const dangerousKeywords = ['ignore', 'turn off tracking', 'fake hospital', 'don\'t worry about battery'];
    const lowerResponse = response.toLowerCase();
    
    for (const word of dangerousKeywords) {
      if (lowerResponse.includes(word)) return false;
    }
    
    return response.trim().length > 5;
  }
}
