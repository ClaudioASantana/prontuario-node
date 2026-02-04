# Implement Sidebar RBAC

## Goal

Restrict sidebar menu items based on the authenticated user's role (RBAC).

## Problem

Currently, all menu items are visible to all users, regardless of their role. This clutters the interface and allows navigation to unauthorized areas (though backend protects data, UI should reflect permissions).

## Solution

1.  Frontend: Update `AuthService` to decode the JWT and expose the user's role.
2.  Frontend: Refactor `SidebarComponent` to render menu items dynamically based on the current user's role.

## User Review Required

- **Roles**: Confirm the role strings match backend: `admin`, `physician`, `patient`, `health_plan`.
- **Menu Visibility**:
  - **Dashboard**: All
  - **Patients**: `admin`, `physician`, `patient` (maybe?)
  - **Health Plans**: `admin`, `health_plan`
  - **Appointments**: `admin`, `physician`, `patient`
  - **Settings**: All
