import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePhysicianDto } from 'src/application/dtos/physicians/physician.dto';
import { CreatePhysicianCommand } from 'src/application/commands/physicians/create-physician.command';
import { GetPhysiciansQuery } from 'src/application/queries/physicians/get-physicians.handler';
import { JwtAuthGuard } from 'src/application/guards/jwt-auth.guard';

@Controller('physicians')
export class PhysiciansController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreatePhysicianDto) {
    return this.commandBus.execute(
      new CreatePhysicianCommand(
        dto.name,
        dto.email,
        dto.crm,
        dto.specialty,
        dto.phone,
        dto.address,
        dto.city,
        dto.state,
      ),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.queryBus.execute(new GetPhysiciansQuery());
  }
}
