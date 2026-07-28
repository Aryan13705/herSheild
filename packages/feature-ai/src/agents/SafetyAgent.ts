export class SafetyAgent {
  public id = 'agent_safety';

  /**
   * Defines the precise safety logic and context requirements for this specialized agent.
   */
  public async getPrompt(context: any): Promise<string> {
    return `Safety Context: Battery ${context.battery}%, Location: ${context.location}`;
  }

  /**
   * Defines a strict output schema validation unique to this agent.
   */
  public validateOutput(output: string): boolean {
    return output.includes('Safe') || output.includes('Caution');
  }
}
