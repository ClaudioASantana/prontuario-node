import { Physician } from 'src/domain/entities/physician.entity';

export const IPhysicianRepositoryToken = 'IPhysicianRepository';

export interface IPhysicianRepository {
  create(physician: Physician): Promise<void>;
  findById(id: string): Promise<Physician | null>;
  findByCrm(crm: string): Promise<Physician | null>;
  findAll(): Promise<Physician[]>;
  update(physician: Physician): Promise<void>;
}
