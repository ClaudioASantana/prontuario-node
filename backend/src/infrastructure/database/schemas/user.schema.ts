// src/modules/users/infrastructure/database/user.schema.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserSchema {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { nullable: true })
  passwordHash: string;

  @Column('int')
  age: number;

  @Column('varchar', { default: 'patient' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
