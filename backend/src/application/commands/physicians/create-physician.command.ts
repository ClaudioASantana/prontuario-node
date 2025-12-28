import { ICommand } from '@nestjs/cqrs';

export class CreatePhysicianCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly crm: string,
    public readonly specialty?: string,
    public readonly phone?: string,
    public readonly address?: string,
    public readonly city?: string,
    public readonly state?: string,
  ) {}
}
