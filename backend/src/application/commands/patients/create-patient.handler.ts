import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePatientCommand } from './create-patient.command';
import { Inject, BadRequestException } from '@nestjs/common';
import { IPatientRepositoryToken } from 'src/domain/interfaces/repositories/patient.repository.interface';
import type { IPatientRepository } from 'src/domain/interfaces/repositories/patient.repository.interface';
import { Patient } from 'src/domain/entities/patient.entity';
import { ErrorCode } from 'src/application/dtos/common/error-response.dto';

@CommandHandler(CreatePatientCommand)
export class CreatePatientHandler implements ICommandHandler<CreatePatientCommand, string> {
  constructor(
    @Inject(IPatientRepositoryToken)
    private readonly repository: IPatientRepository,
  ) {}

  async execute(command: CreatePatientCommand): Promise<string> {
    const existing = await this.repository.findByCpf(command.cpf);
    if (existing) {
      throw new BadRequestException({
        message: 'CPF already registered',
        code: ErrorCode.VALIDATION_ERROR, // Add specific code later if needed
      });
    }

    const patient = new Patient(
      command.name,
      command.email,
      command.cpf,
      command.birthDate,
      command.gender,
    );
    // Set optionals
    patient.phone = command.phone;
    patient.address = command.address;
    patient.city = command.city;
    patient.state = command.state;
    patient.bloodType = command.bloodType;
    if (command.isOrganDonor !== undefined) patient.isOrganDonor = command.isOrganDonor;
    if (command.smoker !== undefined) patient.smoker = command.smoker;
    if (command.alcoholConsumption !== undefined) patient.alcoholConsumption = command.alcoholConsumption;
    if (command.activityLevel !== undefined) patient.activityLevel = command.activityLevel;

    await this.repository.create(patient);
    return patient.id;
  }
}
