import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateHealthPlanDto } from 'src/application/dtos/health-plans/health-plan.dto';
import { CreateHealthPlanCommand } from 'src/application/commands/health-plans/create-health-plan.command';
import { GetHealthPlansQuery } from 'src/application/queries/health-plans/get-health-plans.query';
import { JwtAuthGuard } from 'src/application/guards/jwt-auth.guard';
import { RolesGuard } from 'src/application/guards/roles.guard';
import { Roles } from 'src/application/decorators/roles.decorator';
import { UserRole } from 'src/domain/enums/user-role.enum';

@Controller('health-plans')
export class HealthPlansController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Only authenticated users (maybe only Admin?)
  // @Roles(UserRole.ADMIN) // Uncomment if restricted
  async create(@Body() createHealthPlanDto: CreateHealthPlanDto) {
    return this.commandBus.execute(
      new CreateHealthPlanCommand(
        createHealthPlanDto.name,
        createHealthPlanDto.code,
        createHealthPlanDto.coverageRules || {},
      ),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.queryBus.execute(new GetHealthPlansQuery());
  }
}
