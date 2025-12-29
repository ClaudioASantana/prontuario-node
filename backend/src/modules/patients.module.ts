import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { PatientsController } from 'src/presentation/patients.controller';
import { PatientSchema } from 'src/infrastructure/database/schemas/patient.schema';
import { CreatePatientHandler } from 'src/application/commands/patients/create-patient.handler';
import { UpdatePatientHandler } from 'src/application/commands/patients/update-patient.handler';
import { UploadPatientPhotoHandler } from 'src/application/commands/patients/upload-photo.handler';
import { GetPatientsHandler } from 'src/application/queries/patients/get-patients.handler';
import { IPatientRepositoryToken } from 'src/domain/interfaces/repositories/patient.repository.interface';
import { PatientRepository } from 'src/infrastructure/database/persistence/patient.repository';

const commandHandlers = [
  CreatePatientHandler,
  UpdatePatientHandler,
  UploadPatientPhotoHandler,
];
const queryHandlers = [GetPatientsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([PatientSchema]), CqrsModule],
  controllers: [PatientsController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: IPatientRepositoryToken,
      useClass: PatientRepository,
    },
  ],
})
export class PatientsModule {}
