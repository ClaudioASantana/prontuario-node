import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function createTypeOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'sqlite',
    database: process.env.DATABASE_FILE || 'prontuario.db',
    autoLoadEntities: true,
    synchronize: true,
    migrations: [], // Disable migrations for initial SQLite setup
    migrationsRun: false,
    logging: true,
  };
}
