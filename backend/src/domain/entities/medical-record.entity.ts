import { v4 as uuidv4 } from 'uuid';
import { Patient } from 'src/domain/entities/patient.entity';
import { Physician } from 'src/domain/entities/physician.entity';

export class MedicalRecord {
  id: string;
  patientId: string;
  physicianId: string;
  date: Date;
  
  // Clinical Data
  anamnesis: string;
  diagnosis: string;
  prescription: string;
  examRequest?: string;
  
  patient?: Patient; // Virtual for domain logic if needed
  physician?: Physician;

  createdAt: Date;
  updatedAt: Date;

  constructor(
    patientId: string,
    physicianId: string,
    date: Date,
    anamnesis: string,
    diagnosis: string,
    prescription: string,
    id?: string,
  ) {
    this.id = id || uuidv4();
    this.patientId = patientId;
    this.physicianId = physicianId;
    this.date = date;
    this.anamnesis = anamnesis;
    this.diagnosis = diagnosis;
    this.prescription = prescription;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export class AuditLog {
  id: string;
  entityName: string; // 'MedicalRecord'
  entityId: string;
  action: string; // 'CREATE', 'UPDATE', 'ACCESS'
  userId: string; // Who performed the action
  timestamp: Date;
  details?: string; // JSON diff or details

  constructor(
    entityName: string,
    entityId: string,
    action: string,
    userId: string,
    details?: string,
  ) {
    this.id = uuidv4();
    this.entityName = entityName;
    this.entityId = entityId;
    this.action = action;
    this.userId = userId;
    this.details = details;
    this.timestamp = new Date();
  }
}
