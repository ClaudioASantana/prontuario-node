# Design: Patient Create/Edit

## Context

We are replicating functionality from `cin-saude-old`.
Legacy fields identified: `Nome`, `DataNascimento`, `EMail`, `Cpf`, `Genero`, `TipoSanguineo`, `DoadorOrgaos`, `RecebeuTransfusao10Anos`, `AtividadeFisica`, `BebidasAlcoolicas`, `Fumante`, `Plano/Convênio`, `Cidade`, `Estado`.
User specifically requested "Image Upload" capability.

## Backend Changes

- **Entity**: Update `Patient` entity to include:
  - `photoUrl` (string, nullable)
  - Health fields: `bloodType`, `isOrganDonor`, `smoker`, `alcoholConsumption`, `activityLevel`, `transfusionHistory` (if not already present).
  - Address fields: `city`, `state` (already present, verify).
  - Insurance fields: `insurancePlan`, `insuranceNumber` (new).
- **API**:
  - `POST /patients`: Update DTO to accept all fields.
  - `PUT /patients/:id`: New endpoint for updates.
  - `POST /patients/:id/photo`: New endpoint for avatar upload using `FileInterceptor`.

## Frontend Changes

- **Component**: `PatientFormComponent` (shared for Create/Edit).
  - Uses `ReactiveForms`.
  - Validation for required fields.
  - File Input for Photo.
- **Service**: Update `HttpPatientRepository` with `create`, `update`, `uploadPhoto`.
- **Route**: `/patients/new` and `/patients/:id/edit`.
- **UI**: Use Bootstrap form styles (Cards, Grid).

## Image Upload Strategy

- Backend:
  - Use `@UseInterceptors(FileInterceptor('file'))`.
  - Store file in `uploads/patients/` (local storage for MVP).
  - Serve static files via `ServeStaticModule` or a controller endpoint.
- Frontend:
  - `FormData` to send file.
