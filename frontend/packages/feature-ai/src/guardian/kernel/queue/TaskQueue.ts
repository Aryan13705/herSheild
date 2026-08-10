import { GuardianTask } from '../dispatcher/GuardianDispatcher';
import { ExecutionPriorityEngine } from '../priorities/ExecutionPriorityEngine';

export class TaskQueue {
  private queue: GuardianTask[] = [];

  constructor(private priorityEngine: ExecutionPriorityEngine) {}

  public enqueue(task: GuardianTask) {
    this.queue.push(task);
    // Highest priority tasks bubble to the front
    this.queue.sort((a, b) => this.priorityEngine.compare(b.priority, a.priority));
  }

  public dequeue(): GuardianTask | undefined {
    return this.queue.shift();
  }
  
  public get length() {
    return this.queue.length;
  }
}
