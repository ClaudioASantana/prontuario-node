import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { PhysiciansController } from 'src/presentation/physicians.controller';
import { PhysicianSchema } from 'src/infrastructure/database/schemas/physician.schema';
import { CreatePhysicianHandler } from 'src/application/commands/physicians/create-physician.handler';
import { GetPhysiciansHandler } from 'src/application/queries/physicians/get-physicians.handler';
import { IPhysicianRepositoryToken } from 'src/domain/interfaces/repositories/physician.repository.interface';
import { PhysicianRepository } from 'src/infrastructure/database/persistence/physician.repository';

const commandHandlers = [CreatePhysicianHandler];
const queryHandlers = [GetPhysiciansHandler];

@Module({
  imports: [TypeOrmModule.forFeature([PhysicianSchema]), CqrsModule],
  controllers: [PhysiciansController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: IPhysicianRepositoryToken,
      useClass: PhysicianRepository,
    },
  ],
  exports: [
    IPhysicianRepositoryToken,
  ],
})
export class PhysiciansModule {}
