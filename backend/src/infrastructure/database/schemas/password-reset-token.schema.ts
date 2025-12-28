import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('password_reset_tokens')
export class PasswordResetTokenSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  userId: string;

  @Column('text')
  token: string;

  @Column('timestamp')
  expiresAt: Date;

  @Column('boolean', { default: false })
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  usedAt?: Date;
}
