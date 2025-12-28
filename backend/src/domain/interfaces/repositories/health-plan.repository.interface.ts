import { HealthPlan } from 'src/domain/entities/health-plan.entity';

export const IHealthPlanRepositoryToken = 'IHealthPlanRepository';

export interface IHealthPlanRepository {
  create(healthPlan: HealthPlan): Promise<void>;
  findById(id: string): Promise<HealthPlan | null>;
  findByCode(code: string): Promise<HealthPlan | null>;
  findAll(): Promise<HealthPlan[]>;
}
