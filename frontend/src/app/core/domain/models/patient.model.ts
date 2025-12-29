export interface Patient {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: Date;
  gender: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  bloodType?: string;
  isOrganDonor?: boolean;
  smoker?: boolean;
  alcoholConsumption?: boolean;
  activityLevel?: string;
  photoUrl?: string;
  insurancePlan?: string;
  insuranceNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
