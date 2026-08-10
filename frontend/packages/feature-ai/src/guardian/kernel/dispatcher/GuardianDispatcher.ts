import { ExecutionPriority } from '../priorities/ExecutionPriorityEngine';

export interface GuardianTask {
  id: string;
  type: 'COMMAND' | 'EVENT' | 'TASK' | 'JOB' | 'NOTIFICATION';
  priority: ExecutionPriority;
  payload: any;
  handler: (payload: any) => Promise<void>;
}

export class GuardianDispatcher {
  constructor() {}
  
  public dispatch(task: GuardianTask) {
    // Basic dispatcher routing logic.
    // Real implementation integrates with the Priority TaskQueue.
    console.log(`[Dispatcher] Dispatching ${task.type} with priority ${task.priority}`);
    
    task.handler(task.payload).catch(e => {
      console.error(`[Dispatcher] Task ${task.id} failed`, e);
      // Escalate to DLQ (Dead Letter Queue) or Retry Engine
    });
  }
}
