import { GuardianServiceRegistry } from '../registry/GuardianServiceRegistry';

export class GuardianKernel {
  private static instance: GuardianKernel;
  
  public readonly registry: GuardianServiceRegistry;
  
  private isBooting = false;
  private isRunning = false;

  private constructor() {
    this.registry = new GuardianServiceRegistry();
  }

  public static getInstance(): GuardianKernel {
    if (!GuardianKernel.instance) {
      GuardianKernel.instance = new GuardianKernel();
    }
    return GuardianKernel.instance;
  }

  public async boot(): Promise<void> {
    if (this.isBooting || this.isRunning) return;
    this.isBooting = true;
    console.log('[Kernel] Booting Guardian OS...');

    // Boot sequence: start services in dependency order
    const services = this.registry.getAll();
    for (const service of services) {
      try {
        this.registry.updateStatus(service.metadata.name, 'STARTING');
        await service.start();
        this.registry.updateStatus(service.metadata.name, 'RUNNING');
      } catch (e) {
        this.registry.updateStatus(service.metadata.name, 'FAILED');
        console.error(`[Kernel] Failed to start service ${service.metadata.name}`, e);
      }
    }

    this.isRunning = true;
    this.isBooting = false;
    console.log('[Kernel] Guardian OS Boot Complete.');
  }

  public async shutdown(): Promise<void> {
    console.log('[Kernel] Shutting down Guardian OS...');
    const services = this.registry.getAll();
    for (const service of services) {
      await service.stop();
      this.registry.updateStatus(service.metadata.name, 'STOPPED');
    }
    this.isRunning = false;
  }
}
