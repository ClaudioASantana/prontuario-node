# Proposal: Migrate Database to Supabase PostgreSQL

## Goal

Switch the backend database infrastructure from local SQLite to Supabase (PostgreSQL). Implement "Custom Auth" strategy where the application manages its own `users` table within the public schema, utilizing Supabase solely as a managed PostgreSQL provider for Phase 1.

## Why

1.  **Production Readiness**: SQLite is file-based and not suitable for a distributed production environment.
2.  **User Request**: The user explicitly requested Supabase Postgres.
3.  **Scalability**: Postgres handles concurrent writes and complex queries better than SQLite.
4.  **Auth Strategy (Design Decision)**: To maintain velocity and minimize architectural disruption, we will **keep the existing NestJS `AuthModule` (JWT/Bcrypt)** instead of migrating to Supabase Auth immediately. This keeps domain logic (Patient/Physician linking) intact.

## Scope

- **Backend**:
  - Install `pg` driver.
  - Update `TypeORM` configuration (`data-source.ts` and `app.module.ts`) to use `postgres`.
  - Update `.env` validation to require `DATABASE_URL`.
- **Database**:
  - Run existing migrations against the new Supabase instance.
  - Seed initial data (optional).

## Non-Goals

- **Supabase Auth Integration**: We will NOT use `gotrue` (Supabase Auth) yet. We will treat Supabase as a standard Postgres DB.
- **Frontend Changes**: No frontend changes required as the API contract remains identical.
