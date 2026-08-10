import { VectorMemory } from '../memory/VectorMemory';

export class RAGPipeline {
  constructor(private memory: VectorMemory) {}

  /**
   * Retrieves Guardian Memory, Mission context, and Safety Knowledge 
   * to inject into the PromptEngine.
   */
  public async retrieve(query: string): Promise<string> {
    const results = await this.memory.search(query, 3);
    return results.join("\\n");
  }
}
