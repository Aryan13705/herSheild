import { GuardianServiceRegistry } from '../registry/GuardianServiceRegistry';

export class HealthEngine {
  constructor(private registry: GuardianServiceRegistry) {}

  /**
   * Aggregates the health of all registered OS services.
   */
  public getSystemHealth(): 'HEALTHY' | 'WARNING' | 'CRITICAL' {
    const services = this.registry.getAll();
    const failedCount = services.filter(s => s.metadata.status === 'FAILED').length;
    
    if (failedCount > 2) return 'CRITICAL';
    if (failedCount > 0) return 'WARNING';
    return 'HEALTHY';
  }
}
