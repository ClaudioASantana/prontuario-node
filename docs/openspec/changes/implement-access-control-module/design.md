# Design: Access Control Module

## Frontend

### RoleGuard

A functional guard `roleGuard` that checks `AuthService.currentUserRole`.
Usage:

```typescript
{ path: 'admin', canActivate: [roleGuard], data: { roles: ['admin'] } }
```

### HasRoleDirective

Structural directive `*appHasRole="['admin', 'physician']"` to conditionally render elements.

### User Management UI

A new module `UserManagementModule` for Admins.

- **List Users**: Table with Search/Filter.
- **Edit User**: Dialog/Page to change Name, Email, Role.

## Backend

### Route Protection

Apply `RolesGuard` globally or per controller.
Example:

```typescript
@Controller("health-plans")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("admin", "health_plan")
export class HealthPlansController {}
```

### User Updates

Use `UserController.update` logic but ensure only Admins can update sensitive fields like `role`.
Need to check if `UpdateUserDto` allows role update and if `UpdateUserHandler` processes it securely.
