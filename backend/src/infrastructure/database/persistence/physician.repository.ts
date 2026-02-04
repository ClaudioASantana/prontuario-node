import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPhysicianRepository } from 'src/domain/interfaces/repositories/physician.repository.interface';
import { Physician } from 'src/domain/entities/physician.entity';
import { PhysicianSchema } from '../schemas/physician.schema';
import { PhysicianMapper } from 'src/application/mappers/physicians/physician.mapper';

@Injectable()
export class PhysicianRepository implements IPhysicianRepository {
  constructor(
    @InjectRepository(PhysicianSchema)
    private readonly repository: Repository<PhysicianSchema>,
  ) {}

  async create(physician: Physician): Promise<void> {
    const schema = PhysicianMapper.toPersistence(physician);
    await this.repository.save(schema);
  }

  async findById(id: string): Promise<Physician | null> {
    const schema = await this.repository.findOne({ where: { id } });
    if (!schema) return null;
    return PhysicianMapper.toDomain(schema);
  }

  async findByCrm(crm: string): Promise<Physician | null> {
    const schema = await this.repository.findOne({ where: { crm } });
    if (!schema) return null;
    return PhysicianMapper.toDomain(schema);
  }

  async findByEmail(email: string): Promise<Physician | null> {
    const schema = await this.repository.findOne({ where: { email } });
    if (!schema) return null;
    return PhysicianMapper.toDomain(schema);
  }

  async findAll(): Promise<Physician[]> {
    const schemas = await this.repository.find();
    return schemas.map((schema) => PhysicianMapper.toDomain(schema));
  }

  async update(physician: Physician): Promise<void> {
    const schema = PhysicianMapper.toPersistence(physician);
    await this.repository.save(schema);
  }
}
