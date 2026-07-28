export class Telemetry {
  public logExecution(skillName: string, durationMs: number, success: boolean) {
    // Only logs metrics, never PII
    console.log(`[Telemetry] Skill: ${skillName} | Duration: ${durationMs}ms | Success: ${success}`);
  }

  public logProviderUsage(providerName: string, promptTokens: number, completionTokens: number) {
    console.log(`[Telemetry] Provider: ${providerName} | Tokens: ${promptTokens + completionTokens}`);
  }
}
