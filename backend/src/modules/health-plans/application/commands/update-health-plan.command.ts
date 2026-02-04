import { HealthPlanType } from '../../domain/entities/health-plan.entity';

export class UpdateHealthPlanCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly code?: string,
    public readonly commercialName?: string,
    public readonly type?: HealthPlanType,
    public readonly active?: boolean,
  ) {}
}
