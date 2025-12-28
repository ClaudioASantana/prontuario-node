import { UserRole } from '../enums/user-role.enum';

export class User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  age: number;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    age: number,
    role: UserRole,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.age = age;
    this.role = role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Métodos de lógica de negócio
  updateEmail(newEmail: string): void {
    if (!this.isValidEmail(newEmail)) {
      throw new Error('Email inválido');
    }
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
