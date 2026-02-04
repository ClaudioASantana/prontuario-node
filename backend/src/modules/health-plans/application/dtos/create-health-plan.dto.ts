import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { HealthPlanType } from '../../domain/entities/health-plan.entity';

export class CreateHealthPlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  commercialName?: string;

  @IsEnum(HealthPlanType)
  @IsOptional()
  type?: HealthPlanType;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
