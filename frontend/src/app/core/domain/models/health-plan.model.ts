export enum HealthPlanType {
  INDIVIDUAL = 'Individual',
  COMPANY = 'Company',
  FAMILY = 'Family',
}

export interface HealthPlan {
  id: string;
  name: string;
  code: string;
  commercialName?: string;
  type: HealthPlanType;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}
