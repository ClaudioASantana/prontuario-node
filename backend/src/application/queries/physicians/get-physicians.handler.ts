import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IPhysicianRepositoryToken } from 'src/domain/interfaces/repositories/physician.repository.interface';
import type { IPhysicianRepository } from 'src/domain/interfaces/repositories/physician.repository.interface';
import { PhysicianDto } from 'src/application/dtos/physicians/physician.dto';
import { PhysicianMapper } from 'src/application/mappers/physicians/physician.mapper';

export class GetPhysiciansQuery implements IQuery {}

@QueryHandler(GetPhysiciansQuery)
export class GetPhysiciansHandler implements IQueryHandler<GetPhysiciansQuery, PhysicianDto[]> {
  constructor(
    @Inject(IPhysicianRepositoryToken)
    private readonly repository: IPhysicianRepository,
  ) {}

  async execute(query: GetPhysiciansQuery): Promise<PhysicianDto[]> {
    const physicians = await this.repository.findAll();
    return physicians.map(PhysicianMapper.toDto);
  }
}
