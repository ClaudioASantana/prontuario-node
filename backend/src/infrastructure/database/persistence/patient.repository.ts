import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPatientRepository } from 'src/domain/interfaces/repositories/patient.repository.interface';
import { Patient } from 'src/domain/entities/patient.entity';
import { PatientSchema } from '../schemas/patient.schema';
import { PatientMapper } from 'src/application/mappers/patients/patient.mapper';

@Injectable()
export class PatientRepository implements IPatientRepository {
  constructor(
    @InjectRepository(PatientSchema)
    private readonly repository: Repository<PatientSchema>,
  ) {}

  async create(patient: Patient): Promise<void> {
    const schema = PatientMapper.toPersistence(patient);
    await this.repository.save(schema);
  }

  async findById(id: string): Promise<Patient | null> {
    const schema = await this.repository.findOne({ where: { id } });
    if (!schema) return null;
    return PatientMapper.toDomain(schema);
  }

  async findByCpf(cpf: string): Promise<Patient | null> {
    const schema = await this.repository.findOne({ where: { cpf } });
    if (!schema) return null;
    return PatientMapper.toDomain(schema);
  }

  async findAll(): Promise<Patient[]> {
    const schemas = await this.repository.find();
    return schemas.map((schema) => PatientMapper.toDomain(schema));
  }

  async update(patient: Patient): Promise<void> {
    const schema = PatientMapper.toPersistence(patient);
    await this.repository.save(schema); // Save updates if ID exists
  }
}
