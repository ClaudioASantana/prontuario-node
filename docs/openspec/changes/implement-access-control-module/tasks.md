# Tasks

## Frontend Authorization

- [x] **Frontend**: Create `role.guard.ts` <!-- id: 0 -->
- [x] **Frontend**: Create `has-role.directive.ts` <!-- id: 1 -->
- [x] **Frontend**: Apply `roleGuard` to routes (Patients, HealthPlans, etc.) <!-- id: 2 -->

## User Management (Admin UI)

- [x] **Frontend**: Create `UserManagementModule` <!-- id: 3 -->
- [x] **Frontend**: Implement User List Component <!-- id: 4 -->
- [x] **Frontend**: Implement User Edit/Role Change Component <!-- id: 5 -->

## Backend Authorization

- [x] **Backend**: Create/Update `UpdateUserDto` to include `role` <!-- id: 6 -->
- [x] **Backend**: Create/Ensure `UpdateUserHandler` allows role changes <!-- id: 7 -->
- [x] **Backend**: Apply `@Roles` decorator to `HealthPlansController` <!-- id: 8 -->
- [x] **Backend**: Apply `@Roles` decorator to `PatientsController` <!-- id: 9 -->

## Verification

- [x] **UI/UX**: Redesign User Management List to match ngx-admin style <!-- id: 10 -->
- [ ] **Verification**: Verify backend roles (HealthPlans, Patients, Users) <!-- id: 11 -->
- [ ] **Verification**: Verify frontend navigation and guards <!-- id: 12 -->
- [ ] **Verification**: Admin changes a user's role via UI <!-- id: 12 -->
