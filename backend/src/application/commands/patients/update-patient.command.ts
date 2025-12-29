import { ICommand } from '@nestjs/cqrs';
import { UpdatePatientDto } from 'src/application/dtos/patients/update-patient.dto';

export class UpdatePatientCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdatePatientDto,
  ) {}
}
