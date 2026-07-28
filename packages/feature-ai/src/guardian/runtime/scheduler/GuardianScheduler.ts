import { GuardianEventBus } from '../../events/GuardianEventBus';
import { RuntimeState } from '../GuardianRuntime';

export class GuardianScheduler {
  private scheduledTasks: Map<string, NodeJS.Timeout> = new Map();

  constructor(private eventBus: GuardianEventBus) {}

  /**
   * Intelligently schedules tasks, avoiding continuous polling.
   */
  public schedule(taskId: string, intervalMs: number, task: () => void, stateOverrides?: Partial<Record<RuntimeState, number>>) {
    // Determine interval based on state if overrides exist (adaptive scheduling)
    // For now, simple interval scheduling
    if (this.scheduledTasks.has(taskId)) {
      clearInterval(this.scheduledTasks.get(taskId)!);
    }
    
    const interval = setInterval(task, intervalMs);
    this.scheduledTasks.set(taskId, interval);
  }

  public cancel(taskId: string) {
    if (this.scheduledTasks.has(taskId)) {
      clearInterval(this.scheduledTasks.get(taskId)!);
      this.scheduledTasks.delete(taskId);
    }
  }
}
