import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateHealthPlanDto } from 'src/modules/health-plans/application/dtos/create-health-plan.dto';
import { UpdateHealthPlanDto } from 'src/modules/health-plans/application/dtos/update-health-plan.dto';
import { CreateHealthPlanCommand } from 'src/modules/health-plans/application/commands/create-health-plan.command';
import { UpdateHealthPlanCommand } from 'src/modules/health-plans/application/commands/update-health-plan.command';
import { DeleteHealthPlanCommand } from 'src/modules/health-plans/application/commands/delete-health-plan.command';
import { GetHealthPlansQuery } from 'src/modules/health-plans/application/queries/get-health-plans.query';
import { GetHealthPlanByIdQuery } from 'src/modules/health-plans/application/queries/get-health-plan-by-id.query';
import { JwtGuard } from 'src/infrastructure/common/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/common/guards/roles.guard';
import { Roles } from 'src/infrastructure/common/decorators/roles.decorator';

@Controller('health-plans')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin', 'health_plan')
export class HealthPlansController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createHealthPlanDto: CreateHealthPlanDto) {
    return this.commandBus.execute(
      new CreateHealthPlanCommand(
        createHealthPlanDto.name,
        createHealthPlanDto.code,
        createHealthPlanDto.commercialName,
        createHealthPlanDto.type,
        createHealthPlanDto.active,
      ),
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetHealthPlansQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetHealthPlanByIdQuery(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHealthPlanDto: UpdateHealthPlanDto) {
    return this.commandBus.execute(
      new UpdateHealthPlanCommand(
        id,
        updateHealthPlanDto.name,
        updateHealthPlanDto.code,
        updateHealthPlanDto.commercialName,
        updateHealthPlanDto.type,
        updateHealthPlanDto.active,
      ),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteHealthPlanCommand(id));
  }
}
