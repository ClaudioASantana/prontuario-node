import { ICommand } from '@nestjs/cqrs';

export class CreatePatientCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly cpf: string,
    public readonly birthDate: Date,
    public readonly gender: string,
    public readonly phone?: string,
    public readonly address?: string,
    public readonly city?: string,
    public readonly state?: string,
    public readonly bloodType?: string,
    public readonly isOrganDonor?: boolean,
    public readonly smoker?: boolean,
    public readonly alcoholConsumption?: boolean,
    public readonly activityLevel?: number,
  ) {}
}
