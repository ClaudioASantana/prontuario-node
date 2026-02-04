import { UserRole } from 'src/domain/enums/user-role.enum';

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly email?: string,
    public readonly role?: UserRole,
  ) {}
}
