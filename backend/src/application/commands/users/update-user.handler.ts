import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  IUserRepositoryToken,
  type IUserRepository,
} from '../../../domain/interfaces/repositories/user.repository.interface';
import { User } from 'src/domain/entities/user.entity';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (command.name) user.name = command.name;
    if (command.email) user.updateEmail(command.email);
    if (command.role) user.role = command.role;

    await this.userRepository.update(user);
  }
}
