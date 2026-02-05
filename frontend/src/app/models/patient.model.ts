export interface Patient {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: Date | string; // Handle ISO strings from API
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
  createdAt?: Date;
  updatedAt?: Date;
}
