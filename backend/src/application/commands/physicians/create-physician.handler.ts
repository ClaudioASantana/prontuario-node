import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePhysicianCommand } from './create-physician.command';
import { Inject, BadRequestException } from '@nestjs/common';
import { IPhysicianRepositoryToken } from 'src/domain/interfaces/repositories/physician.repository.interface';
import type { IPhysicianRepository } from 'src/domain/interfaces/repositories/physician.repository.interface';
import { Physician } from 'src/domain/entities/physician.entity';
import { ErrorCode } from 'src/application/dtos/common/error-response.dto';

@CommandHandler(CreatePhysicianCommand)
export class CreatePhysicianHandler implements ICommandHandler<CreatePhysicianCommand, string> {
  constructor(
    @Inject(IPhysicianRepositoryToken)
    private readonly repository: IPhysicianRepository,
  ) {}

  async execute(command: CreatePhysicianCommand): Promise<string> {
    const existing = await this.repository.findByCrm(command.crm);
    if (existing) {
      throw new BadRequestException({
        message: 'CRM already registered',
        code: ErrorCode.VALIDATION_ERROR, // Add specific code later
      });
    }

    const physician = new Physician(
      command.name,
      command.email,
      command.crm,
    );
    physician.specialty = command.specialty;
    physician.phone = command.phone;
    physician.address = command.address;
    physician.city = command.city;
    physician.state = command.state;

    await this.repository.create(physician);
    return physician.id;
  }
}
