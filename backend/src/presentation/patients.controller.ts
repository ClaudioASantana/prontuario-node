import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePatientDto } from 'src/application/dtos/patients/patient.dto';
import { CreatePatientCommand } from 'src/application/commands/patients/create-patient.command';
import { GetPatientsQuery } from 'src/application/queries/patients/get-patients.handler'; // Consolidated file for simplicity
import { JwtAuthGuard } from 'src/application/guards/jwt-auth.guard';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreatePatientDto) {
    return this.commandBus.execute(
      new CreatePatientCommand(
        dto.name,
        dto.email,
        dto.cpf,
        dto.birthDate,
        dto.gender,
        dto.phone,
        dto.address,
        dto.city,
        dto.state,
        dto.bloodType,
        dto.isOrganDonor,
        dto.smoker,
        dto.alcoholConsumption,
        dto.activityLevel,
      ),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.queryBus.execute(new GetPatientsQuery());
  }
}
