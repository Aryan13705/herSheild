export interface SystemStateSnapshot {
  runtimeState: string;
  missionState: string;
  batteryLevel: number;
  isOffline: boolean;
  systemHealth: 'HEALTHY' | 'WARNING' | 'CRITICAL';
}

export class KernelState {
  private state: SystemStateSnapshot = {
    runtimeState: 'Idle',
    missionState: 'Inactive',
    batteryLevel: 100,
    isOffline: false,
    systemHealth: 'HEALTHY'
  };

  public get(): SystemStateSnapshot {
    return { ...this.state };
  }

  public update(partial: Partial<SystemStateSnapshot>) {
    this.state = { ...this.state, ...partial };
  }
}
