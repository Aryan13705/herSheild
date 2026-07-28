export type ExecutionPriority = 'EMERGENCY' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'BACKGROUND';

const PriorityScore: Record<ExecutionPriority, number> = {
  EMERGENCY: 100,
  CRITICAL: 80,
  HIGH: 60,
  MEDIUM: 40,
  LOW: 20,
  BACKGROUND: 0,
};

export class ExecutionPriorityEngine {
  /**
   * Compares two priorities. Returns >0 if p1 > p2, <0 if p1 < p2, 0 if equal.
   */
  public compare(p1: ExecutionPriority, p2: ExecutionPriority): number {
    return PriorityScore[p1] - PriorityScore[p2];
  }
  
  public getScore(priority: ExecutionPriority): number {
    return PriorityScore[priority];
  }
}
