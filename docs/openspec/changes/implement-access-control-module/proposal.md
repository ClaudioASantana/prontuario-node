# Implement Access Control Module

## Goal

Establish a formalized Access Control Module to manage user roles and permissions securely and effectively across both Backend and Frontend.

## Problem

Currently, role management is done via ad-hoc database scripts, and frontend access control is limited to hiding sidebar items. There is no UI for administrators to manage users, and backend routes need explicit protection using the existing `RolesGuard`.

## Solution

1.  **Frontend**:
    - Implement `RoleGuard` to protect routes based on roles.
    - Create a `UserManagementModule` (Admin Panel) to list users and edit their roles.
    - add `HasRoleDirective` for granular UI control.
2.  **Backend**:
    - Apply `@Roles` decorator and `RolesGuard` to critical controllers (Patients, Health Plans, etc.).
    - Ensure `UpdateUserRole` endpoint exists or is accessible to Admins.

## User Review Required

- **Role Hierarchy**: Is there a hierarchy? e.g. Admin > Physician > Patient? Or are they distinct?
- **Admin Scope**: Can Admins edit _any_ user?
