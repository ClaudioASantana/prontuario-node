import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMedicalRecordRepository } from 'src/domain/interfaces/repositories/medical-record.repository.interface';
import { MedicalRecord, AuditLog } from 'src/domain/entities/medical-record.entity';
import { MedicalRecordSchema, AuditLogSchema } from '../schemas/medical-record.schema';
import { MedicalRecordMapper } from 'src/application/mappers/medical-records/medical-record.mapper';

@Injectable()
export class MedicalRecordRepository implements IMedicalRecordRepository {
  constructor(
    @InjectRepository(MedicalRecordSchema)
    private readonly repository: Repository<MedicalRecordSchema>,
    @InjectRepository(AuditLogSchema)
    private readonly auditRepository: Repository<AuditLogSchema>,
  ) {}

  async create(record: MedicalRecord): Promise<void> {
    const schema = MedicalRecordMapper.toPersistence(record);
    await this.repository.save(schema);
  }

  async findById(id: string): Promise<MedicalRecord | null> {
    const schema = await this.repository.findOne({ where: { id } });
    if (!schema) return null;
    return MedicalRecordMapper.toDomain(schema);
  }

  async findByPatientId(patientId: string): Promise<MedicalRecord[]> {
    const schemas = await this.repository.find({ where: { patientId } });
    return schemas.map(MedicalRecordMapper.toDomain);
  }

  async findByPhysicianId(physicianId: string): Promise<MedicalRecord[]> {
    const schemas = await this.repository.find({ where: { physicianId } });
    return schemas.map(MedicalRecordMapper.toDomain);
  }

  async saveAuditLog(log: AuditLog): Promise<void> {
    const schema = new AuditLogSchema();
    schema.id = log.id;
    schema.entityName = log.entityName;
    schema.entityId = log.entityId;
    schema.action = log.action;
    schema.userId = log.userId;
    schema.timestamp = log.timestamp;
    schema.details = log.details ?? '';
    await this.auditRepository.save(schema);
  }
}
