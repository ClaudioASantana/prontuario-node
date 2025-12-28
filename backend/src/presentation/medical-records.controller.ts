import { Controller, Post, Body, Get, UseGuards, Param, Request } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMedicalRecordDto } from 'src/application/dtos/medical-records/medical-record.dto';
import { CreateMedicalRecordCommand } from 'src/application/commands/medical-records/create-medical-record.command';
import { GetMedicalRecordsQuery } from 'src/application/queries/medical-records/get-medical-records.handler';
import { JwtAuthGuard } from 'src/application/guards/jwt-auth.guard';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateMedicalRecordDto, @Request() req: any) {
    const userId = req.user.userId; // Extracted from JWT
    return this.commandBus.execute(
      new CreateMedicalRecordCommand(
        dto.patientId,
        dto.physicianId,
        dto.date,
        dto.anamnesis,
        dto.diagnosis,
        dto.prescription,
        userId,
        dto.examRequest,
      ),
    );
  }

  @Get('patient/:patientId')
  @UseGuards(JwtAuthGuard)
  async findByPatient(@Param('patientId') patientId: string) {
    return this.queryBus.execute(new GetMedicalRecordsQuery(patientId));
  }
}
