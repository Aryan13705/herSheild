import { GuardianServiceRegistry } from '../registry/GuardianServiceRegistry';

export class RecoveryEngine {
  constructor(private registry: GuardianServiceRegistry) {}

  /**
   * Automatically attempts to heal failed modules without crashing the OS.
   */
  public async attemptRecovery(serviceName: string) {
    const service = this.registry.get(serviceName);
    if (!service) return;

    console.log(`[RecoveryEngine] Attempting to recover ${serviceName}...`);
    try {
      await service.stop();
      await service.start();
      this.registry.updateStatus(serviceName, 'RUNNING');
      console.log(`[RecoveryEngine] Recovered ${serviceName} successfully.`);
    } catch (e) {
      console.error(`[RecoveryEngine] Failed to recover ${serviceName}. Escalating.`);
      // In a real system, escalate to safe mode or alert the user.
    }
  }
}
