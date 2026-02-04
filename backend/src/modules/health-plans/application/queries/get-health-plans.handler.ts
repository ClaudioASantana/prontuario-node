import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetHealthPlansQuery } from './get-health-plans.query';
import { HealthPlan } from '../../domain/entities/health-plan.entity';

@QueryHandler(GetHealthPlansQuery)
export class GetHealthPlansHandler implements IQueryHandler<GetHealthPlansQuery> {
  constructor(
    @InjectRepository(HealthPlan)
    private readonly repository: Repository<HealthPlan>,
  ) {}

  async execute(): Promise<HealthPlan[]> {
    return this.repository.find({ order: { name: 'ASC' } });
  }
}
