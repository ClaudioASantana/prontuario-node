import { Patient } from 'src/domain/entities/patient.entity';

export const IPatientRepositoryToken = 'IPatientRepository';

export interface IPatientRepository {
  create(patient: Patient): Promise<void>;
  findById(id: string): Promise<Patient | null>;
  findByCpf(cpf: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
  update(patient: Patient): Promise<void>;
}
