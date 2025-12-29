// src/modules/auth/domain/entities/token-payload.entity.ts
export class TokenPayload {
  userId: string;
  email: string;
  roles: string[];
  permissions: string[];
  organizationId?: string;
  specialties?: string[];
  iat?: number;
  exp?: number;

  constructor(
    userId: string,
    email: string,
    roles: string[] = [],
    permissions: string[] = [],
    organizationId?: string,
    specialties: string[] = [],
  ) {
    this.userId = userId;
    this.email = email;
    this.roles = roles;
    this.permissions = permissions;
    this.organizationId = organizationId;
    this.specialties = specialties;
  }
}
