import { ICommand } from '@nestjs/cqrs';

export class UploadPatientPhotoCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly file: any,
  ) {}
}
