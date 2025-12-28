# Design: Supabase Migration & Auth Strategy

## 1. Database Architecture

We are moving from `sqlite` to `postgres`.

- **Driver**: `pg` (node-postgres).
- **Schema**: Public schema in Supabase.
- **ORM**: TypeORM (already configured, just switching type).

## 2. Authentication Strategy Decision

**The Question**: Should we use Supabase Auth or Custom Application Auth?

**The Recommendation**: **Custom Application Auth (Current Implementation)**.

### Reasoning

1.  **Architecture Integrity**: The current Modular Monolith is built around a `User` entity linked to `Physician` and `Patient` aggregates.

    - `Patient` -> `User`
    - `Physician` -> `User`
    - Roles (`PATIENT`, `PHYSICIAN`, `ADMIN`) are managed in the `users` table.

2.  **Supabase Auth Complexity**:

    - Supabase Auth stores users in a specialized `auth.users` table, not accessible directly for foreign keys unless using specific patterns (e.g., public table clones with triggers).
    - Using Supabase Auth would require:
      - Frontend: Implementing `@supabase/supabase-js` auth client.
      - Backend: Implementing a Guard to verify Supabase JWTs instead of our local JWTs.
      - Syncing: Creating a trigger to copy `auth.users` inserts to `public.users` to maintain foreign key relationships for `patients` and `physicians`.

3.  **Migration Risk**:
    - We just stabilized the backend. Ripping out the `AuthModule` now introduces significant regression risk.
    - **Phase 1**: Treat Supabase as "Just Postgres". Keep `users` table in `public`. Everything works "as is".
    - **Phase 2 (Future)**: If Social Login (Google/Apple) becomes a requirement, migrate to Supabase Auth by setting up the Sync Triggers and swapping the Auth Guard.

## 3. Configuration Changes

### `.env`

- Old: `DATABASE_FILENAME=prontuario.sqlite`
- New: `DATABASE_URL=postgres://postgres:password@db.supabase.co:5432/postgres` (Current user state has this).

### `ormconfig` / `data-source.ts`

- Change `type: 'sqlite'` -> `type: 'postgres'`.
- Add `ssl: { rejectUnauthorized: false }` (Required for Supabase/Production Postgres generally).
