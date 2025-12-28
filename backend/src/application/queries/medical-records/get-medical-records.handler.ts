import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IMedicalRecordRepositoryToken } from 'src/domain/interfaces/repositories/medical-record.repository.interface';
import type { IMedicalRecordRepository } from 'src/domain/interfaces/repositories/medical-record.repository.interface';
import { MedicalRecordDto } from 'src/application/dtos/medical-records/medical-record.dto';
import { MedicalRecordMapper } from 'src/application/mappers/medical-records/medical-record.mapper';

export class GetMedicalRecordsQuery implements IQuery {
  constructor(public readonly patientId: string) {}
}

@QueryHandler(GetMedicalRecordsQuery)
export class GetMedicalRecordsHandler implements IQueryHandler<GetMedicalRecordsQuery, MedicalRecordDto[]> {
  constructor(
    @Inject(IMedicalRecordRepositoryToken)
    private readonly repository: IMedicalRecordRepository,
  ) {}

  async execute(query: GetMedicalRecordsQuery): Promise<MedicalRecordDto[]> {
    const records = await this.repository.findByPatientId(query.patientId);
    return records.map(MedicalRecordMapper.toDto);
  }
}
