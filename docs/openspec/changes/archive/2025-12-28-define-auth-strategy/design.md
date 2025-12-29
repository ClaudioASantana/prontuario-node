# Authentication Strategy Design

## Background

We evaluated two primary approaches for the authentication layer:

1. **Managed Service (Supabase/Firebase)**: Rapid implementation, handled security.
2. **Custom Service (NestJS + Passport)**: Full control, deep integration with legacy/custom schemas.

## Analysis from `Usuário_.txt`

The architectural reference `docs/Usuário_.txt` emphasizes:

- **Modular Services**: A dedicated Auth Service issuing tokens.
- **Granular Roles**: Physicians, Patients, Health Plans.
- **Data Isolation**: Strict tenancy models.
- **Custom Claims**: Tokens containing `organization`, `specialties`, etc.

## Decision: Custom Auth Strategy

We recommend continuing with the **Custom NestJS + Passport** implementation for the following reasons:

### 1. Complex Role Management

The logic for verifying a Physician (licensing, specialties) vs a Patient (insurance coverage) is business-critical and domain-specific. A custom service allows us to bake these checks into the token issuance flow more naturally than webhooks in a managed service.

### 2. Microservice Readiness

The architecture calls for an "Auth Service" that acts as a central authority. Start with a refined Monolithic Module (`src/modules/auth`) that follows the Facade pattern, allowing it to be extracted into a standalone microservice later without refactoring consuming modules.

### 3. Data Sovereignty & Compliance

Handling health data (HIPAA/LGPD) often requires strict control over where user data resides. Owning the `users` table and `auth` logs affords better auditability and schema control than a third-party wrapper.

## Architecture

- **Protocol**: OAuth 2.0 / OpenID Connect (internal implementation details).
- **Token**: Stateless JWT (JSON Web Token).
- **Storage**: Redis (for refresh token allow-lists/block-lists) + Relational DB (Users).

### Token Structure Proposal

```json
{
  "sub": "uuid-v4",
  "email": "doctor@example.com",
  "roles": ["physician"],
  "permissions": ["records:read", "records:write"],
  "context": {
    "specialties": ["cardiology"],
    "organization_id": "org-123"
  }
}
```

## Alternative Considered: Supabase

Supabase is an excellent choice for speed. If the team prefers to offload auth maintenance and accepts the trade-off of slightly less flexible custom claims integration (requiring PostgreSQL triggers or Edge Functions to sync claims), it remains a valid Plan B. However, for a rigid medical domain model, the Custom approach is preferred.
