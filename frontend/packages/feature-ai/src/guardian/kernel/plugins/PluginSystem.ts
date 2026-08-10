export interface GuardianPlugin {
  id: string;
  name: string;
  initialize(): Promise<void>;
}

export class PluginSystem {
  private plugins: Map<string, GuardianPlugin> = new Map();

  /**
   * Exposes a standardized interface for future modules (e.g. Wearables, Drones) 
   * to register dynamically with the Kernel.
   */
  public registerPlugin(plugin: GuardianPlugin) {
    this.plugins.set(plugin.id, plugin);
    console.log(`[PluginSystem] Registered plugin: ${plugin.name}`);
  }
}
