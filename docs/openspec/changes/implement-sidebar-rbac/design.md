# Design: Sidebar RBAC

## User Roles

Based on Backend `UserRole` enum:

- `admin`
- `physician`
- `patient`
- `health_plan`

## Menu Structure

The sidebar menu will be defined as an array of `MenuItem` objects:

```typescript
interface MenuItem {
  label: string;
  icon: string; // SVG content or icon name
  route: string;
  roles?: string[]; // If undefined/empty, visible to all
}
```

### Mapping

| Menu Item    | Roles                           |
| :----------- | :------------------------------ |
| Dashboard    | All                             |
| Patients     | `admin`, `physician`, `patient` |
| Health Plans | `admin`, `health_plan`          |
| Appointments | `admin`, `physician`, `patient` |
| Settings     | All                             |

## Implementation Details

### AuthService

- Use `jwt-decode` to extract the `role` (or `roles`) claim from the access token upon login and initialization (`isAuthenticated`).
- Expose a `currentUserRole`: `string | null` signal or behavior subject.

### SidebarComponent

- Subscribe to `authService.currentUserRole`.
- Filter `MENU_ITEMS` where `item.roles.includes(currentRole)` or `!item.roles`.
