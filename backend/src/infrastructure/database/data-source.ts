import { DataSource } from 'typeorm';
import { join } from 'path';

import { UserSchema } from './schemas/user.schema';
import { HealthPlanSchema } from './schemas/health-plan.schema';
import { RefreshTokenSchema } from './schemas/refresh-token.schema';
import { PatientSchema } from './schemas/patient.schema';
import { PhysicianSchema } from './schemas/physician.schema';
import { MedicalRecordSchema, AuditLogSchema } from './schemas/medical-record.schema';

// Load env vars for CLI usage
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
  entities: [
    UserSchema, 
    RefreshTokenSchema, 
    HealthPlanSchema, 
    PatientSchema, 
    PhysicianSchema, 
    MedicalRecordSchema, 
    AuditLogSchema
  ],
  migrations: [
    join(__dirname, 'migrations', '*.ts'),
  ],
  synchronize: false,
  logging: false, // Enable logging for debugging
});
