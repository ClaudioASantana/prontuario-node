import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function createTypeOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    autoLoadEntities: true,
    synchronize: false,
    migrations: [join(process.cwd(), 'dist', 'infrastructure', 'database', 'migrations', '*.js')],
    migrationsRun: true,
    logging: true,
  };
}
