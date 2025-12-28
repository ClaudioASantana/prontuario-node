import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHealthPlanCommand } from './create-health-plan.command';
import { Inject, BadRequestException } from '@nestjs/common';
import { IHealthPlanRepositoryToken } from 'src/domain/interfaces/repositories/health-plan.repository.interface';
import type { IHealthPlanRepository } from 'src/domain/interfaces/repositories/health-plan.repository.interface';
import { HealthPlan } from 'src/domain/entities/health-plan.entity';
import { ErrorCode } from 'src/application/dtos/common/error-response.dto';

@CommandHandler(CreateHealthPlanCommand)
export class CreateHealthPlanHandler implements ICommandHandler<CreateHealthPlanCommand, string> {
  constructor(
    @Inject(IHealthPlanRepositoryToken)
    private readonly repository: IHealthPlanRepository,
  ) {}

  async execute(command: CreateHealthPlanCommand): Promise<string> {
    const existing = await this.repository.findByCode(command.code);
    if (existing) {
      throw new BadRequestException({
        message: 'Health Plan code already exists',
        code: ErrorCode.VALIDATION_ERROR,
      });
    }

    const healthPlan = new HealthPlan(command.name, command.code, command.coverageRules);
    await this.repository.create(healthPlan);
    return healthPlan.id;
  }
}
