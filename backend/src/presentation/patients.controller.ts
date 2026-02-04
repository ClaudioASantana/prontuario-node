import { Controller, Post, Body, Get, UseGuards, Put, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePatientDto } from 'src/application/dtos/patients/patient.dto';
import { UpdatePatientDto } from 'src/application/dtos/patients/update-patient.dto';
import { CreatePatientCommand } from 'src/application/commands/patients/create-patient.command';
import { UpdatePatientCommand } from 'src/application/commands/patients/update-patient.command';
import { UploadPatientPhotoCommand } from 'src/application/commands/patients/upload-photos.command';
import { GetPatientsQuery } from 'src/application/queries/patients/get-patients.handler'; // Consolidated file for simplicity
import { JwtGuard } from 'src/infrastructure/common/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/common/guards/roles.guard';
import { Roles } from 'src/infrastructure/common/decorators/roles.decorator';

@Controller('patients')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin', 'physician', 'patient')
export class PatientsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
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
  async findAll() {
    return this.queryBus.execute(new GetPatientsQuery());
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.commandBus.execute(new UpdatePatientCommand(id, dto));
  }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: any,
  ) {
    return this.commandBus.execute(new UploadPatientPhotoCommand(id, file));
  }
}
