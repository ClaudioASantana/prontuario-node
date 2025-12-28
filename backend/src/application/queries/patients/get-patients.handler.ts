import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IPatientRepositoryToken } from 'src/domain/interfaces/repositories/patient.repository.interface';
import type { IPatientRepository } from 'src/domain/interfaces/repositories/patient.repository.interface';
import { PatientDto } from 'src/application/dtos/patients/patient.dto';
import { PatientMapper } from 'src/application/mappers/patients/patient.mapper';

export class GetPatientsQuery implements IQuery {}

@QueryHandler(GetPatientsQuery)
export class GetPatientsHandler implements IQueryHandler<GetPatientsQuery, PatientDto[]> {
  constructor(
    @Inject(IPatientRepositoryToken)
    private readonly repository: IPatientRepository,
  ) {}

  async execute(query: GetPatientsQuery): Promise<PatientDto[]> {
    const patients = await this.repository.findAll();
    return patients.map(PatientMapper.toDto);
  }
}
