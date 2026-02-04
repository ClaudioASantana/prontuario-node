import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteHealthPlanCommand } from './delete-health-plan.command';
import { HealthPlan } from '../../domain/entities/health-plan.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteHealthPlanCommand)
export class DeleteHealthPlanHandler implements ICommandHandler<DeleteHealthPlanCommand> {
  constructor(
    @InjectRepository(HealthPlan)
    private readonly repository: Repository<HealthPlan>,
  ) {}

  async execute(command: DeleteHealthPlanCommand): Promise<void> {
    const result = await this.repository.delete(command.id);
    if (result.affected === 0) {
      throw new NotFoundException(`HealthPlan with ID ${command.id} not found`);
    }
  }
}
