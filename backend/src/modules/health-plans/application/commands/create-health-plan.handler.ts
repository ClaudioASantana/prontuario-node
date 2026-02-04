import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHealthPlanCommand } from './create-health-plan.command';
import { HealthPlan } from '../../domain/entities/health-plan.entity';

@CommandHandler(CreateHealthPlanCommand)
export class CreateHealthPlanHandler implements ICommandHandler<CreateHealthPlanCommand> {
  constructor(
    @InjectRepository(HealthPlan)
    private readonly repository: Repository<HealthPlan>,
  ) {}

  async execute(command: CreateHealthPlanCommand): Promise<HealthPlan> {
    const healthPlan = this.repository.create(command);
    return this.repository.save(healthPlan);
  }
}
