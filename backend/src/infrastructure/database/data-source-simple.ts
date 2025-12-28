import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserSchema } from './schemas/user.schema';
import { HealthPlanSchema } from './schemas/health-plan.schema';
import { RefreshTokenSchema } from './schemas/refresh-token.schema';
import { PatientSchema } from './schemas/patient.schema';
import { PhysicianSchema } from './schemas/physician.schema';
import { MedicalRecordSchema, AuditLogSchema } from './schemas/medical-record.schema';

dotenv.config();

export const SimpleDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [
    UserSchema, 
    HealthPlanSchema, 
    RefreshTokenSchema, 
    PatientSchema, 
    PhysicianSchema, 
    MedicalRecordSchema, 
    AuditLogSchema
  ],
  synchronize: false,
});

console.log('SimpleDataSource initialized');
