import { GuardianServiceRegistry } from '../registry/GuardianServiceRegistry';

export class HeartbeatSystem {
  private intervalId?: NodeJS.Timeout;

  constructor(private registry: GuardianServiceRegistry) {}

  public start() {
    // Heartbeat checks every 10s
    this.intervalId = setInterval(() => this.checkHeartbeats(), 10000);
  }

  public stop() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private async checkHeartbeats() {
    const services = this.registry.getAll();
    for (const service of services) {
      if (service.metadata.status !== 'RUNNING') continue;
      
      try {
        const isHealthy = await service.healthCheck();
        if (!isHealthy) {
          console.warn(`[Heartbeat] Service ${service.metadata.name} reported unhealthy.`);
          this.registry.updateStatus(service.metadata.name, 'FAILED');
        }
      } catch (e) {
        console.error(`[Heartbeat] Service ${service.metadata.name} failed heartbeat.`, e);
        this.registry.updateStatus(service.metadata.name, 'FAILED');
      }
    }
  }
}
