import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum HealthPlanType {
  INDIVIDUAL = 'Individual',
  COMPANY = 'Company',
  FAMILY = 'Family',
}

@Entity('health_plans')
export class HealthPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ name: 'commercial_name', nullable: true })
  commercialName: string;

  @Column({
    type: 'simple-enum',
    enum: HealthPlanType,
    default: HealthPlanType.INDIVIDUAL
  })
  type: HealthPlanType;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
