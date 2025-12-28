import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHealthPlansQuery } from './get-health-plans.query';
import { Inject } from '@nestjs/common';
import { IHealthPlanRepositoryToken } from 'src/domain/interfaces/repositories/health-plan.repository.interface';
import type { IHealthPlanRepository } from 'src/domain/interfaces/repositories/health-plan.repository.interface';
import { HealthPlanDto } from 'src/application/dtos/health-plans/health-plan.dto';
import { HealthPlanMapper } from 'src/application/mappers/health-plans/health-plan.mapper';

@QueryHandler(GetHealthPlansQuery)
export class GetHealthPlansHandler implements IQueryHandler<GetHealthPlansQuery, HealthPlanDto[]> {
  constructor(
    @Inject(IHealthPlanRepositoryToken)
    private readonly repository: IHealthPlanRepository,
  ) {}

  async execute(query: GetHealthPlansQuery): Promise<HealthPlanDto[]> {
    const plans = await this.repository.findAll();
    return plans.map(HealthPlanMapper.toDto);
  }
}
