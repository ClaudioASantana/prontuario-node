# Formalize Authentication Strategy

## Goal

Establish a clear, documented authentication strategy for the Prontuário system, deciding between a managed service (Supabase) and a custom implementation (NestJS + Passport), and formalizing the requirements based on architectural needs.

## Context

The system requires a robust, modular authentication mechanism capable of handling multiple user types (Patients, Physicians, Health Plans) with distinct permissions and data isolation requirements. A prior analysis (`docs/Usuário_.txt`) recommended a distributed auth pattern with rich JWT claims.

## Key Changes

- Document the decision to use a Custom Auth Service (NestJS + Passport).
- Define the standard JWT token structure.
- Define the role-based access control (RBAC) high-level architecture.
