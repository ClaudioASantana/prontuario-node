import { v4 as uuidv4 } from 'uuid';

export class HealthPlan {
  id: string;
  name: string;
  code: string;
  coverageRules: Record<string, any>; // JSON
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    code: string,
    coverageRules: Record<string, any> = {},
    id?: string,
  ) {
    this.id = id || uuidv4();
    this.name = name;
    this.code = code;
    this.coverageRules = coverageRules;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
