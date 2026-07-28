import { GuardianEventBus } from '../../events/GuardianEventBus';

export class BatteryWatcher {
  private batteryManager?: any;

  constructor(private eventBus: GuardianEventBus) {}

  public async start() {
    if ('getBattery' in navigator) {
      this.batteryManager = await (navigator as any).getBattery();
      
      this.batteryManager.addEventListener('levelchange', this.onLevelChange.bind(this));
      this.batteryManager.addEventListener('chargingchange', this.onLevelChange.bind(this));
      
      // Trigger initial
      this.onLevelChange();
    }
  }

  private onLevelChange() {
    if (!this.batteryManager) return;
    
    const level = this.batteryManager.level * 100;
    
    this.eventBus.publish({
      type: 'BATTERY_CHANGED',
      payload: { level, charging: this.batteryManager.charging },
      timestamp: new Date()
    });

    if (level <= 20) {
      this.eventBus.publish({ type: 'BATTERY_LOW', payload: { level }, timestamp: new Date() });
    }
    if (level <= 5) {
      this.eventBus.publish({ type: 'BATTERY_CRITICAL', payload: { level }, timestamp: new Date() });
    }
  }
}
