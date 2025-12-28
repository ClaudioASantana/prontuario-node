# Tasks: Migrate to Supabase

## Infrastructure

- [x] Install `pg` dependency <!-- id: task-install-pg -->
- [x] Uninstall `sqlite3` dependency <!-- id: task-uninstall-sqlite -->
- [ ] Update `backend/package.json` scripts if necessary <!-- id: task-update-scripts -->

## Configuration

- [x] Update `backend/src/infrastructure/database/data-source.ts` to use `postgres` type and `DATABASE_URL` <!-- id: task-update-datasource -->
- [x] Update `backend/src/app.module.ts` TypeORM config to match `data-source.ts` <!-- id: task-update-appmodule -->
- [x] Update `backend/src/infrastructure/config/validation.schema.ts` (or equivalent) to enforce `DATABASE_URL` presence <!-- id: task-update-env-validation -->

## Execution

- [x] Run `npm run typeorm:migration:run` against Supabase to create schema <!-- id: task-run-migrations-supabase -->
- [x] Verify application startup with `npm run start:dev` <!-- id: task-verify-startup -->

## Verification

- [ ] Create a test user via API (`POST /auth/register` or seed) to verify DB write <!-- id: task-verify-full-flow -->
