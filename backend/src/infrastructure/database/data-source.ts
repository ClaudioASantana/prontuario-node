import { DataSource } from 'typeorm';
import { join } from 'path';

import { UserSchema } from './schemas/user.schema';
import { HealthPlanSchema } from './schemas/health-plan.schema';
import { RefreshTokenSchema } from './schemas/refresh-token.schema';
import { PatientSchema } from './schemas/patient.schema';
import { PhysicianSchema } from './schemas/physician.schema';
import {
  MedicalRecordSchema,
  AuditLogSchema,
} from './schemas/medical-record.schema';

// Load env vars for CLI usage
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'prontuario.db',
  entities: [
    UserSchema,
    RefreshTokenSchema,
    HealthPlanSchema,
    PatientSchema,
    PhysicianSchema,
    MedicalRecordSchema,
    AuditLogSchema,
  ],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  synchronize: true, // Auto-create tables for SQLite dev
  logging: false,
});
