export class CreateHealthPlanDto {
  name: string;
  code: string;
  coverageRules?: Record<string, any>;
}

export class HealthPlanDto {
  id: string;
  name: string;
  code: string;
  coverageRules: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
