import { GuardianContext } from '../context/GuardianContextEngine';

export interface GuardianSkill {
  name: string;
  
  execute(context: GuardianContext, intentParameters: any): Promise<any>;
  
  validate(output: any): boolean;
}
