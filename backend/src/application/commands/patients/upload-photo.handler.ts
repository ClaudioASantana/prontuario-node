import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadPatientPhotoCommand } from './upload-photos.command';
import { Inject, NotFoundException } from '@nestjs/common';
import * as patientRepositoryInterface from 'src/domain/interfaces/repositories/patient.repository.interface';
import { PatientDto } from 'src/application/dtos/patients/patient.dto';
import * as fs from 'fs';
import * as path from 'path';

@CommandHandler(UploadPatientPhotoCommand)
export class UploadPatientPhotoHandler
  implements ICommandHandler<UploadPatientPhotoCommand, PatientDto>
{
  constructor(
    @Inject(patientRepositoryInterface.IPatientRepositoryToken)
    private readonly patientRepository: patientRepositoryInterface.IPatientRepository,
  ) {}

  async execute(command: UploadPatientPhotoCommand): Promise<PatientDto> {
    const { id, file } = command;
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'uploads', 'patients');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save file
    const fileExt = path.extname(file.originalname);
    const fileName = `${id}-${Date.now()}${fileExt}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    // Update patient photo URL (relative path for serving)
    const photoUrl = `/uploads/patients/${fileName}`;
    patient.photoUrl = photoUrl;
    patient.updatedAt = new Date();

    await this.patientRepository.update(patient);

    // Return updated DTO (simple mapping)
    // In a real scenario, use Mapper.toDto(patient)
    // We can cast here for simplicity since we modified the entity
    return patient as unknown as PatientDto;
  }
}
