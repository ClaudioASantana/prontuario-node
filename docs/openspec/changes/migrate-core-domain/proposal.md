# Proposal: Migrate Core Domain Features

**Change ID**: `migrate-core-domain`

## Summary

Modernize the legacy `cin-saude-old` system by migrating to `prontuario-node` using a **Modular Monolith** architecture. This aligns with the "ResumoIA" recommendations for separation of concerns and scalability, while avoiding the immediate operational complexity of microservices.

## Motivation

The legacy system is monolithic and tightly coupled. The "ResumoIA" analysis highlights the need for:

- **Better Scalability**: Separating read/write heavy loads (e.g. Records vs Auth).
- **Security**: Granular access control (RBAC) and data isolation.
- **Maintainability**: Clear boundaries between Patients, Doctors, and Medical Records.

## Proposed Solution

We will implement the suggested logical separation as strict **NestJS Modules**:

1.  **Auth Module**: Centralized JWT handling with RBAC (Roles: Patient, Physician, Admin).
2.  **Patient Module**: Profile management (distinct from clinical data).
3.  **Physician Module**: Credentialing and patient associations.
4.  **Medical Record Module (Core)**: Clinical data storage with strict access audits.
5.  **Health Plan Module**: Coverage and validation (newly identified from ResumoIA).

This approach (Modular Monolith) allows us to deploy as a single service now, but easily extract microservices (e.g., via Nx) in the future if scale demands it.

## Scope

- **Backend**: 5 Distinct Modules (Auth, Patient, Physician, Record, HealthPlan).
- **Frontend**: Adjusted UI to consume these specific contexts.
