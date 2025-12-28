import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { HealthPlansModule } from './modules/health-plans.module';
import { PhysiciansModule } from './modules/physicians.module';
import { PatientsModule } from './modules/patients.module';
import { MedicalRecordsModule } from './modules/medical-records.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    HealthPlansModule,
    PatientsModule,
    PhysiciansModule,
    MedicalRecordsModule,
  ],
})
export class AppModule {}
