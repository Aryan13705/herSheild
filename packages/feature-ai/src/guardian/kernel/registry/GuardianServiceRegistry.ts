export interface GuardianServiceMetadata {
  name: string;
  version: string;
  status: 'REGISTERED' | 'STARTING' | 'RUNNING' | 'STOPPED' | 'FAILED';
  dependencies: string[];
  priority: 'EMERGENCY' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'BACKGROUND';
}

export interface GuardianService {
  metadata: GuardianServiceMetadata;
  start(): Promise<void>;
  stop(): Promise<void>;
  healthCheck(): Promise<boolean>;
}

export class GuardianServiceRegistry {
  private services = new Map<string, GuardianService>();

  public register(service: GuardianService) {
    if (this.services.has(service.metadata.name)) {
      throw new Error(`Service ${service.metadata.name} already registered`);
    }
    this.services.set(service.metadata.name, service);
    console.log(`[Registry] Registered service: ${service.metadata.name}`);
  }

  public get(name: string): GuardianService | undefined {
    return this.services.get(name);
  }

  public getAll(): GuardianService[] {
    return Array.from(this.services.values());
  }

  public updateStatus(name: string, status: GuardianServiceMetadata['status']) {
    const service = this.services.get(name);
    if (service) {
      service.metadata.status = status;
    }
  }
}
