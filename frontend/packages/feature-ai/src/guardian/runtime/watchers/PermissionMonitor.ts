import { GuardianEventBus } from '../../events/GuardianEventBus';

export class PermissionMonitor {
  constructor(private eventBus: GuardianEventBus) {}

  public async start() {
    if (typeof navigator !== 'undefined' && 'permissions' in navigator) {
      const geoPerm = await navigator.permissions.query({ name: 'geolocation' as any });
      geoPerm.addEventListener('change', () => {
        this.eventBus.publish({ 
          type: 'PERMISSION_CHANGED', 
          payload: { permission: 'geolocation', state: geoPerm.state }, 
          timestamp: new Date() 
        });
      });
    }
  }
}
