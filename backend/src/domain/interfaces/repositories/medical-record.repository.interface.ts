import { MedicalRecord, AuditLog } from 'src/domain/entities/medical-record.entity';

export const IMedicalRecordRepositoryToken = 'IMedicalRecordRepository';

export interface IMedicalRecordRepository {
  create(record: MedicalRecord): Promise<void>;
  findById(id: string): Promise<MedicalRecord | null>;
  findByPatientId(patientId: string): Promise<MedicalRecord[]>;
  findByPhysicianId(physicianId: string): Promise<MedicalRecord[]>;
  
  // Audit
  saveAuditLog(log: AuditLog): Promise<void>;
}
