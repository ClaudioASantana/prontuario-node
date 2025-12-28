import { ICommand } from '@nestjs/cqrs';

export class CreateHealthPlanCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly code: string,
    public readonly coverageRules: Record<string, any>,
  ) {}
}
