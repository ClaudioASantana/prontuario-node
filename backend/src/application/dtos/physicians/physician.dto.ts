export class CreatePhysicianDto {
  name: string;
  email: string;
  crm: string;
  specialty?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
}

export class PhysicianDto {
  id: string;
  name: string;
  email: string;
  crm: string;
  specialty?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
