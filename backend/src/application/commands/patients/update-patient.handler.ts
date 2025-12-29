import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePatientCommand } from './update-patient.command';
import { Inject, NotFoundException } from '@nestjs/common';
import * as patientRepositoryInterface from 'src/domain/interfaces/repositories/patient.repository.interface';
import { PatientDto } from 'src/application/dtos/patients/patient.dto';

@CommandHandler(UpdatePatientCommand)
export class UpdatePatientHandler
  implements ICommandHandler<UpdatePatientCommand, PatientDto>
{
  constructor(
    @Inject(patientRepositoryInterface.IPatientRepositoryToken)
    private readonly patientRepository: patientRepositoryInterface.IPatientRepository,
  ) {}

  async execute(command: UpdatePatientCommand): Promise<PatientDto> {
    const { id, dto } = command;
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // Update fields
    Object.assign(patient, dto);
    patient.updatedAt = new Date();

    const updatedPatient = await this.patientRepository.update(patient);
    
    // Map to DTO (simple mapping for now)
    return updatedPatient as unknown as PatientDto;
  }
}
