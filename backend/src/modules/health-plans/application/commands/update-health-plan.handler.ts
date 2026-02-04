import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateHealthPlanCommand } from './update-health-plan.command';
import { HealthPlan } from '../../domain/entities/health-plan.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateHealthPlanCommand)
export class UpdateHealthPlanHandler implements ICommandHandler<UpdateHealthPlanCommand> {
  constructor(
    @InjectRepository(HealthPlan)
    private readonly repository: Repository<HealthPlan>,
  ) {}

  async execute(command: UpdateHealthPlanCommand): Promise<HealthPlan> {
    const { id, ...data } = command;
    const healthPlan = await this.repository.findOneBy({ id });
    
    if (!healthPlan) {
      throw new NotFoundException(`HealthPlan with ID ${id} not found`);
    }

    Object.assign(healthPlan, data);
    return this.repository.save(healthPlan);
  }
}
