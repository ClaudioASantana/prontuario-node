import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('physicians')
export class PhysicianSchema {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { unique: true })
  crm: string;

  @Column('varchar', { nullable: true })
  specialty: string | null;

  @Column('varchar', { nullable: true })
  phone: string | null;

  @Column('varchar', { nullable: true })
  address: string | null;

  @Column('varchar', { nullable: true })
  city: string | null;

  @Column('varchar', { nullable: true })
  state: string | null;

  @Column('varchar', { default: 'Active' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
