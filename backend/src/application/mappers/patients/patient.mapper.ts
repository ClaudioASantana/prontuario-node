import { Patient } from 'src/domain/entities/patient.entity';
import { PatientDto } from 'src/application/dtos/patients/patient.dto';
import { PatientSchema } from 'src/infrastructure/database/schemas/patient.schema';

export class PatientMapper {
  static toDomain(raw: PatientSchema): Patient {
    const patient = new Patient(
      raw.name,
      raw.email,
      raw.cpf,
      raw.birthDate,
      raw.gender,
      raw.id,
    );
    patient.phone = raw.phone ?? undefined;
    patient.address = raw.address ?? undefined;
    patient.city = raw.city ?? undefined;
    patient.state = raw.state ?? undefined;
    patient.photoUrl = raw.photoUrl ?? undefined;
    patient.insurancePlan = raw.insurancePlan ?? undefined;
    patient.insuranceNumber = raw.insuranceNumber ?? undefined;
    patient.bloodType = raw.bloodType ?? undefined;
    patient.isOrganDonor = raw.isOrganDonor;
    patient.smoker = raw.smoker;
    patient.alcoholConsumption = raw.alcoholConsumption;
    patient.activityLevel = raw.activityLevel;
    patient.createdAt = raw.createdAt;
    patient.updatedAt = raw.updatedAt;
    return patient;
  }

  static toDto(domain: Patient): PatientDto {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      cpf: domain.cpf,
      birthDate: domain.birthDate,
      gender: domain.gender,
      phone: domain.phone,
      address: domain.address,
      city: domain.city,
      state: domain.state,
      bloodType: domain.bloodType,
      isOrganDonor: domain.isOrganDonor,
      smoker: domain.smoker,
      alcoholConsumption: domain.alcoholConsumption,
      activityLevel: domain.activityLevel,
      photoUrl: domain.photoUrl,
      insurancePlan: domain.insurancePlan,
      insuranceNumber: domain.insuranceNumber,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toPersistence(domain: Patient): PatientSchema {
    const schema = new PatientSchema();
    schema.id = domain.id;
    schema.name = domain.name;
    schema.email = domain.email;
    schema.cpf = domain.cpf;
    schema.birthDate = domain.birthDate;
    schema.gender = domain.gender;
    schema.phone = domain.phone ?? null;
    schema.address = domain.address ?? null;
    schema.city = domain.city ?? null;
    schema.state = domain.state ?? null;
    schema.photoUrl = domain.photoUrl ?? null;
    schema.insurancePlan = domain.insurancePlan ?? null;
    schema.insuranceNumber = domain.insuranceNumber ?? null;
    schema.bloodType = domain.bloodType ?? null;
    schema.isOrganDonor = domain.isOrganDonor;
    schema.smoker = domain.smoker;
    schema.alcoholConsumption = domain.alcoholConsumption;
    schema.activityLevel = domain.activityLevel;
    schema.createdAt = domain.createdAt;
    schema.updatedAt = domain.updatedAt;
    return schema;
  }
}
