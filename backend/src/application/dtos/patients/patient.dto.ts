export class CreatePatientDto {
  name: string;
  email: string;
  cpf: string;
  birthDate: Date;
  gender: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  bloodType?: string;
  isOrganDonor?: boolean;
  smoker?: boolean;
  alcoholConsumption?: boolean;
  activityLevel?: number;
  photoUrl?: string;
  insurancePlan?: string;
  insuranceNumber?: string;
  receivedTransfusion10Years?: boolean;
}

export class PatientDto {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: Date;
  gender: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  bloodType?: string;
  isOrganDonor: boolean;
  smoker: boolean;
  alcoholConsumption: boolean;
  activityLevel: number;
  photoUrl?: string;
  insurancePlan?: string;
  insuranceNumber?: string;
  receivedTransfusion10Years: boolean;
  createdAt: Date;
  updatedAt: Date;
}
