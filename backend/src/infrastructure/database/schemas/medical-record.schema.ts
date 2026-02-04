import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PatientSchema } from './patient.schema';
import { PhysicianSchema } from './physician.schema';

@Entity('medical_records')
export class MedicalRecordSchema {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  patientId: string;

  @Column('varchar')
  physicianId: string;

  @Column('datetime')
  date: Date;

  @Column('text')
  anamnesis: string;

  @Column('text')
  diagnosis: string;

  @Column('text')
  prescription: string;

  @Column('text', { nullable: true })
  examRequest: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => PatientSchema)
  @JoinColumn({ name: 'patientId' })
  patient: PatientSchema;

  @ManyToOne(() => PhysicianSchema)
  @JoinColumn({ name: 'physicianId' })
  physician: PhysicianSchema;
}

@Entity('audit_logs')
export class AuditLogSchema {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  entityName: string;

  @Column('varchar')
  entityId: string;

  @Column('varchar')
  action: string;

  @Column('varchar')
  userId: string;

  @Column('datetime')
  timestamp: Date;

  @Column('text', { nullable: true })
  details: string | null;
}
