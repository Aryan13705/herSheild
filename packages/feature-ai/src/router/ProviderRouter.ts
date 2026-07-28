import { AIProvider } from '../providers/AIProvider';
import { GeminiProvider } from '../providers/GeminiProvider';
import { OpenAIProvider } from '../providers/OpenAIProvider';

export type ModelRequirement = 'FAST' | 'CHEAP' | 'REASONING' | 'HIGHEST_ACCURACY';

export class ProviderRouter {
  private providers: Map<string, AIProvider> = new Map();
  private primaryProvider: string = 'gemini';

  constructor() {
    this.providers.set('gemini', new GeminiProvider());
    this.providers.set('openai', new OpenAIProvider());
  }

  public getProvider(requirement: ModelRequirement): AIProvider {
    // In an enterprise system, this looks up live Benchmarks and Latency metrics.
    switch (requirement) {
      case 'FAST': return this.providers.get('gemini')!;
      case 'CHEAP': return this.providers.get('gemini')!; // E.g., Gemini Flash
      case 'REASONING': return this.providers.get('openai')!; // E.g., GPT-4o / o1
      case 'HIGHEST_ACCURACY': return this.providers.get('openai')!;
      default: return this.providers.get(this.primaryProvider)!;
    }
  }

  public getFallbackProvider(failedProviderName: string): AIProvider {
    return failedProviderName === 'gemini' 
      ? this.providers.get('openai')! 
      : this.providers.get('gemini')!;
  }
}
