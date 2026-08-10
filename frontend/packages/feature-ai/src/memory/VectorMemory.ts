export interface VectorMemory {
  search(query: string, limit: number): Promise<string[]>;
  store(text: string, metadata: any): Promise<void>;
}
