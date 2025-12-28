import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { MedicalRecordsController } from 'src/presentation/medical-records.controller';
import { MedicalRecordSchema, AuditLogSchema } from 'src/infrastructure/database/schemas/medical-record.schema';
import { CreateMedicalRecordHandler } from 'src/application/commands/medical-records/create-medical-record.handler';
import { GetMedicalRecordsHandler } from 'src/application/queries/medical-records/get-medical-records.handler';
import { IMedicalRecordRepositoryToken } from 'src/domain/interfaces/repositories/medical-record.repository.interface';
import { MedicalRecordRepository } from 'src/infrastructure/database/persistence/medical-record.repository';

const commandHandlers = [CreateMedicalRecordHandler];
const queryHandlers = [GetMedicalRecordsHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecordSchema, AuditLogSchema]),
    CqrsModule,
  ],
  controllers: [MedicalRecordsController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: IMedicalRecordRepositoryToken,
      useClass: MedicalRecordRepository,
    },
  ],
})
export class MedicalRecordsModule {}
