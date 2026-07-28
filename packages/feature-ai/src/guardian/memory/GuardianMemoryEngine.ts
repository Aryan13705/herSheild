export interface GuardianMemory {
  id: string;
  category: string; // 'transport', 'pace', 'budget', etc.
  fact: string;
  confidence: number;
  expiresAt?: Date;
}

export class GuardianMemoryEngine {
  public async remember(userId: string, category: string, fact: string, confidence: number = 1.0): Promise<void> {
    console.log(`[MemoryEngine] Saving fact for ${userId}: [${category}] ${fact} (Conf: ${confidence})`);
    // Connects to guardian_memories db table
  }

  public async getRelevantMemories(userId: string, categories: string[]): Promise<GuardianMemory[]> {
    // Fetches from db
    return [];
  }

  public async forget(userId: string, memoryId: string): Promise<void> {
    // Delete from db
  }
  
  public async summarize(userId: string): Promise<string> {
    return "User prefers walking in well-lit areas, budget travel.";
  }
}
