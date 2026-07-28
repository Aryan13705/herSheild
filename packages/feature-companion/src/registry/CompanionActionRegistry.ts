export type CompanionActionHandler = (payload?: any) => Promise<void>;

export interface CompanionAction {
  id: string;
  name: string;
  description: string;
  handler: CompanionActionHandler;
}

class ActionRegistry {
  private actions = new Map<string, CompanionAction>();

  public register(action: CompanionAction) {
    this.actions.set(action.id, action);
    console.log(`[CompanionActionRegistry] Registered action: ${action.id}`);
  }

  public async execute(actionId: string, payload?: any) {
    const action = this.actions.get(actionId);
    if (!action) throw new Error(`Action ${actionId} not found`);
    return await action.handler(payload);
  }

  public getAvailableActions() {
    return Array.from(this.actions.values());
  }
}

export const CompanionActionRegistry = new ActionRegistry();
