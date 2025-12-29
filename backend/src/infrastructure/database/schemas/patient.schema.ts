import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('patients')
export class PatientSchema {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { unique: true })
  cpf: string;

  @Column('timestamp')
  birthDate: Date;

  @Column('varchar')
  gender: string;

  @Column('varchar', { nullable: true })
  phone: string | null;

  @Column('varchar', { nullable: true })
  address: string | null;

  @Column('varchar', { nullable: true })
  city: string | null;

  @Column('varchar', { nullable: true })
  state: string | null;

  @Column('varchar', { nullable: true })
  photoUrl: string | null;

  @Column('varchar', { nullable: true })
  insurancePlan: string | null;

  @Column('varchar', { nullable: true })
  insuranceNumber: string | null;

  // Health Profile
  @Column('varchar', { nullable: true })
  bloodType: string | null;

  @Column('boolean', { default: false })
  isOrganDonor: boolean;

  @Column('boolean', { default: false })
  smoker: boolean;

  @Column('boolean', { default: false })
  alcoholConsumption: boolean;

  @Column('int', { default: 0 })
  activityLevel: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
