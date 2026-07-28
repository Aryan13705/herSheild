import { GuardianEventBus } from '../../events/GuardianEventBus';

export class NetworkWatcher {
  constructor(private eventBus: GuardianEventBus) {}

  public start() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
      
      const connection = (navigator as any).connection;
      if (connection) {
        connection.addEventListener('change', this.handleConnectionChange);
      }
    }
  }

  private handleOnline = () => {
    this.eventBus.publish({ type: 'OFFLINE_EXITED', payload: {}, timestamp: new Date() });
  };

  private handleOffline = () => {
    this.eventBus.publish({ type: 'OFFLINE_ENTERED', payload: {}, timestamp: new Date() });
  };

  private handleConnectionChange = () => {
    const connection = (navigator as any).connection;
    if (connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g')) {
      this.eventBus.publish({ type: 'NETWORK_WEAK', payload: { type: connection.effectiveType }, timestamp: new Date() });
    }
  };
}
