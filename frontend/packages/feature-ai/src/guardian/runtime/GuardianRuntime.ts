import { GuardianEventBus } from '../events/GuardianEventBus';

export type RuntimeState = 'Idle' | 'Monitoring' | 'Mission' | 'Emergency' | 'Sleeping' | 'Background';

export class GuardianRuntime {
  private state: RuntimeState = 'Idle';

  constructor(private eventBus: GuardianEventBus) {
    this.setupStateTransitions();
  }

  public initialize() {
    console.log('[GuardianRuntime] Initializing operating system...');
    this.transitionTo('Monitoring');
    // Initialize watchers here
  }

  public pause() {
    console.log('[GuardianRuntime] Pausing runtime operations.');
    this.transitionTo('Sleeping');
  }

  public resume() {
    console.log('[GuardianRuntime] Resuming runtime operations.');
    this.transitionTo('Monitoring');
  }

  public shutdown() {
    console.log('[GuardianRuntime] Shutting down operating system.');
    this.transitionTo('Idle');
  }

  public enableLowPowerMode() {
    console.log('[GuardianRuntime] Low Power Mode Engaged.');
    // Notify watchers to throttle
  }

  private setupStateTransitions() {
    this.eventBus.subscribe('MISSION_STARTED', () => this.transitionTo('Mission'));
    this.eventBus.subscribe('MISSION_COMPLETED', () => this.transitionTo('Monitoring'));
    this.eventBus.subscribe('EMERGENCY_TRIGGERED', () => this.transitionTo('Emergency'));
  }

  private transitionTo(newState: RuntimeState) {
    console.log(`[GuardianRuntime] State Transition: ${this.state} -> ${newState}`);
    this.state = newState;
    
    // Deterministic behaviour based on new state
    if (newState === 'Emergency') {
      // Elevate all watcher priorities, bypass battery limits
    }
  }

  public getState(): RuntimeState {
    return this.state;
  }
}
