import { v4 as uuidv4 } from 'uuid';

export class Patient {
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
  photoUrl?: string;
  insurancePlan?: string;
  insuranceNumber?: string;

  // Health Profile
  bloodType?: string;
  isOrganDonor: boolean;
  smoker: boolean;
  alcoholConsumption: boolean;
  activityLevel: number; // 0-Low, 1-Medium, 2-High

  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    email: string,
    cpf: string,
    birthDate: Date,
    gender: string,
    id?: string,
  ) {
    this.id = id || uuidv4();
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.birthDate = birthDate;
    this.gender = gender;
    // Defaults matching legacy logic potential
    this.isOrganDonor = false;
    this.smoker = false;
    this.alcoholConsumption = false;
    this.activityLevel = 0;
    
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
