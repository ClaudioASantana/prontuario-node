import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { HealthPlansController } from 'src/presentation/health-plans.controller';
import { HealthPlanSchema } from 'src/infrastructure/database/schemas/health-plan.schema';
import { CreateHealthPlanHandler } from 'src/application/commands/health-plans/create-health-plan.handler';
import { GetHealthPlansHandler } from 'src/application/queries/health-plans/get-health-plans.handler';
import { IHealthPlanRepositoryToken } from 'src/domain/interfaces/repositories/health-plan.repository.interface';
import { HealthPlanRepository } from 'src/infrastructure/database/persistence/health-plan.repository';

const commandHandlers = [CreateHealthPlanHandler];
const queryHandlers = [GetHealthPlansHandler];

@Module({
  imports: [TypeOrmModule.forFeature([HealthPlanSchema]), CqrsModule],
  controllers: [HealthPlansController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: IHealthPlanRepositoryToken,
      useClass: HealthPlanRepository,
    },
  ],
})
export class HealthPlansModule {}
