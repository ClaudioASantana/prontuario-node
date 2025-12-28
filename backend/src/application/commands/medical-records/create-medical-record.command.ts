import { ICommand } from '@nestjs/cqrs';

export class CreateMedicalRecordCommand implements ICommand {
  constructor(
    public readonly patientId: string,
    public readonly physicianId: string,
    public readonly date: Date,
    public readonly anamnesis: string,
    public readonly diagnosis: string,
    public readonly prescription: string,
    public readonly userId: string, // For Audit
    public readonly examRequest?: string,
  ) {}
}
