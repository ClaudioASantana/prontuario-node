import { v4 as uuidv4 } from 'uuid';

export class Physician {
  id: string;
  name: string;
  email: string;
  crm: string;
  specialty?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  
  // Professional details
  status: string; // 'Active', 'Inactive'
  
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    email: string,
    crm: string,
    status: string = 'Active',
    id?: string,
  ) {
    this.id = id || uuidv4();
    this.name = name;
    this.email = email;
    this.crm = crm;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
