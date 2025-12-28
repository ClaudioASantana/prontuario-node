import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMedicalRecordCommand } from './create-medical-record.command';
import { Inject } from '@nestjs/common';
import { IMedicalRecordRepositoryToken } from 'src/domain/interfaces/repositories/medical-record.repository.interface';
import type { IMedicalRecordRepository } from 'src/domain/interfaces/repositories/medical-record.repository.interface';
import { MedicalRecord, AuditLog } from 'src/domain/entities/medical-record.entity';

@CommandHandler(CreateMedicalRecordCommand)
export class CreateMedicalRecordHandler implements ICommandHandler<CreateMedicalRecordCommand, string> {
  constructor(
    @Inject(IMedicalRecordRepositoryToken)
    private readonly repository: IMedicalRecordRepository,
  ) {}

  async execute(command: CreateMedicalRecordCommand): Promise<string> {
    const record = new MedicalRecord(
      command.patientId,
      command.physicianId,
      command.date,
      command.anamnesis,
      command.diagnosis,
      command.prescription,
    );
    record.examRequest = command.examRequest;

    // Persist Record
    await this.repository.create(record);

    // Persist Audit Log
    const audit = new AuditLog(
      'MedicalRecord',
      record.id,
      'CREATE',
      command.userId,
      JSON.stringify({ 
        patientId: command.patientId, 
        physicianId: command.physicianId 
      }),
    );
    await this.repository.saveAuditLog(audit);

    return record.id;
  }
}
