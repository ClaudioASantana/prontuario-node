# Implement Patients Feature

## Goal

Implement the **Patients Listing** feature in the frontend, enabling users to view a list of patients fetched from the backend API. Additionally, ensure the backend authentication token includes granular fields (permissions, specialties) to support future precision filtering.

## Context

- **Backend**: Currently has basic `PatientsController` and `Login` logic. The `TokenPayload` was recently updated to include granular fields, but they are not being populated with real data during login.
- **Frontend**: Has a basic `PatientRepository` but no UI for listing patients.
- **User Request**: "Implement Patients Listing" and "Follow suggestions" (which included the JWT fix).

## Key Changes

### Backend

1.  **JWT Population**: Update `LoginHandler` (or the `AuthService` logic) to fetch and map `permissions`, `organizationId`, and `specialties` into the JWT payload.
2.  **API Verification**: Ensure `GET /patients` works as expected for the frontend.

### Frontend

1.  **Model Sync**: Update `Patient` model to match Backend DTO.
2.  **Service**: Verify/Update `HttpPatientRepository` to correctly handle `GET /api/v1/patients`.
3.  **UI**: Create `PatientsComponent` at `/modules/patients`.
    - Use a table layout with `ngx-admin` styling.
    - Columns: Name, Email, CPF, Phone, Actions (Edit/Delete placeholders).
4.  **Routing**: Connect `/patients` route in `app.routes.ts`.

## Visual Reference

A clean, responsive table similar to `ngx-admin` tables (Smart Table or basic Bootstrap-like table), utilizing the existing `styles.scss` variables.
