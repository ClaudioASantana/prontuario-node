import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
