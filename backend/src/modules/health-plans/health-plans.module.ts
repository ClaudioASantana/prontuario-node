import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { HealthPlansController } from './presentation/health-plans.controller';
import { HealthPlan } from './domain/entities/health-plan.entity';
import { CreateHealthPlanHandler } from './application/commands/create-health-plan.handler';
import { UpdateHealthPlanHandler } from './application/commands/update-health-plan.handler';
import { DeleteHealthPlanHandler } from './application/commands/delete-health-plan.handler';
import { GetHealthPlansHandler } from './application/queries/get-health-plans.handler';
import { GetHealthPlanByIdHandler } from './application/queries/get-health-plan-by-id.handler';

const CommandHandlers = [
  CreateHealthPlanHandler,
  UpdateHealthPlanHandler,
  DeleteHealthPlanHandler,
];

const QueryHandlers = [
  GetHealthPlansHandler,
  GetHealthPlanByIdHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([HealthPlan]), CqrsModule],
  controllers: [HealthPlansController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class HealthPlansModule {}
