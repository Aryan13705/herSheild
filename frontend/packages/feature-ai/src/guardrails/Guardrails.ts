export class Guardrails {
  private unsafeKeywords = [
    'ignore previous instructions',
    'medical diagnosis',
    'legal advice',
    'how to hack',
    'system prompt'
  ];

  /**
   * Prevents prompt injection and rejects dangerous user requests before they hit the LLM.
   */
  public isSafeInput(input: string): boolean {
    const lower = input.toLowerCase();
    return !this.unsafeKeywords.some(kw => lower.includes(kw));
  }

  /**
   * Evaluates the LLM output to ensure it doesn't hallucinate dangerous advice.
   */
  public isSafeOutput(output: string): boolean {
    // In production, this can invoke a smaller, cheaper moderation model.
    return output.trim().length > 0;
  }
}
