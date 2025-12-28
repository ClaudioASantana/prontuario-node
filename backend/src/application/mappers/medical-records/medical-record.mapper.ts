import { MedicalRecord, AuditLog } from 'src/domain/entities/medical-record.entity';
import { MedicalRecordDto } from 'src/application/dtos/medical-records/medical-record.dto';
import { MedicalRecordSchema } from 'src/infrastructure/database/schemas/medical-record.schema';

export class MedicalRecordMapper {
  static toDomain(raw: MedicalRecordSchema): MedicalRecord {
    const record = new MedicalRecord(
      raw.patientId,
      raw.physicianId,
      raw.date,
      raw.anamnesis,
      raw.diagnosis,
      raw.prescription,
      raw.id,
    );
    record.examRequest = raw.examRequest ?? undefined;
    record.createdAt = raw.createdAt;
    record.updatedAt = raw.updatedAt;
    return record;
  }

  static toDto(domain: MedicalRecord): MedicalRecordDto {
    return {
      id: domain.id,
      patientId: domain.patientId,
      physicianId: domain.physicianId,
      date: domain.date,
      anamnesis: domain.anamnesis,
      diagnosis: domain.diagnosis,
      prescription: domain.prescription,
      examRequest: domain.examRequest,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toPersistence(domain: MedicalRecord): MedicalRecordSchema {
    const schema = new MedicalRecordSchema();
    schema.id = domain.id;
    schema.patientId = domain.patientId;
    schema.physicianId = domain.physicianId;
    schema.date = domain.date;
    schema.anamnesis = domain.anamnesis;
    schema.diagnosis = domain.diagnosis;
    schema.prescription = domain.prescription;
    schema.examRequest = domain.examRequest ?? null;
    schema.createdAt = domain.createdAt;
    schema.updatedAt = domain.updatedAt;
    return schema;
  }
}
