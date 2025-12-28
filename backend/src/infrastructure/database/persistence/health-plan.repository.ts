import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IHealthPlanRepository } from 'src/domain/interfaces/repositories/health-plan.repository.interface';
import { HealthPlan } from 'src/domain/entities/health-plan.entity';
import { HealthPlanSchema } from '../schemas/health-plan.schema';
import { HealthPlanMapper } from 'src/application/mappers/health-plans/health-plan.mapper';

@Injectable()
export class HealthPlanRepository implements IHealthPlanRepository {
  constructor(
    @InjectRepository(HealthPlanSchema)
    private readonly repository: Repository<HealthPlanSchema>,
  ) {}

  async create(healthPlan: HealthPlan): Promise<void> {
    const schema = HealthPlanMapper.toPersistence(healthPlan);
    await this.repository.save(schema);
  }

  async findById(id: string): Promise<HealthPlan | null> {
    const schema = await this.repository.findOne({ where: { id } });
    if (!schema) return null;
    return HealthPlanMapper.toDomain(schema);
  }

  async findByCode(code: string): Promise<HealthPlan | null> {
    const schema = await this.repository.findOne({ where: { code } });
    if (!schema) return null;
    return HealthPlanMapper.toDomain(schema);
  }

  async findAll(): Promise<HealthPlan[]> {
    const schemas = await this.repository.find();
    return schemas.map((schema) => HealthPlanMapper.toDomain(schema));
  }
}
