import { HealthPlan } from 'src/domain/entities/health-plan.entity';
import { HealthPlanDto } from 'src/application/dtos/health-plans/health-plan.dto';
import { HealthPlanSchema } from 'src/infrastructure/database/schemas/health-plan.schema';

export class HealthPlanMapper {
  static toDomain(raw: HealthPlanSchema): HealthPlan {
    const healthPlan = new HealthPlan(
      raw.name,
      raw.code,
      raw.coverageRules,
      raw.id,
    );
    healthPlan.createdAt = raw.createdAt;
    healthPlan.updatedAt = raw.updatedAt;
    return healthPlan;
  }

  static toDto(domain: HealthPlan): HealthPlanDto {
    return {
      id: domain.id,
      name: domain.name,
      code: domain.code,
      coverageRules: domain.coverageRules,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toPersistence(domain: HealthPlan): HealthPlanSchema {
    const schema = new HealthPlanSchema();
    schema.id = domain.id;
    schema.name = domain.name;
    schema.code = domain.code;
    schema.coverageRules = domain.coverageRules;
    schema.createdAt = domain.createdAt;
    schema.updatedAt = domain.updatedAt;
    return schema;
  }
}
