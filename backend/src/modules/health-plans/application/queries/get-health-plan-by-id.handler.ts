import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetHealthPlanByIdQuery } from './get-health-plan-by-id.query';
import { HealthPlan } from '../../domain/entities/health-plan.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetHealthPlanByIdQuery)
export class GetHealthPlanByIdHandler implements IQueryHandler<GetHealthPlanByIdQuery> {
  constructor(
    @InjectRepository(HealthPlan)
    private readonly repository: Repository<HealthPlan>,
  ) {}

  async execute(query: GetHealthPlanByIdQuery): Promise<HealthPlan> {
    const healthPlan = await this.repository.findOneBy({ id: query.id });
    if (!healthPlan) {
      throw new NotFoundException(`HealthPlan with ID ${query.id} not found`);
    }
    return healthPlan;
  }
}
