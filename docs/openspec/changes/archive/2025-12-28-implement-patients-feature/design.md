# Patients Feature Design

## Architecture

### Backend (JWT Enhancement)

- **Problem**: `TokenPayload` has fields like `permissions` and `specialties`, but `LoginHandler` currently initializes them as empty.
- **Solution**:
  - Inject `PhysicianRepository` (or similar) into `LoginHandler`.
  - If the user is a physician, fetch their specialties and permissions.
  - Populate the `TokenPayload` before generating the JWT.

### Frontend (Patients List)

- **Component**: `PatientsComponent` (`src/app/modules/patients/patients.component.ts`)
- **Route**: `/patients` (Lazy loaded or direct, direct for now as app is small).
- **Service**: `HttpPatientRepository` needs to use the `HttpClient` to call `${apiUrl}/patients`.
  - _Note_: Ensure `apiUrl` includes `/api/v1`.

### UI Design

We will use a **Card-based Table** layout common in admin dashboards.

```html
<div class="page-header">
  <h1>Patients</h1>
  <button class="btn-primary">Add Patient</button>
</div>

<div class="card">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>CPF</th>
        <th>Contact</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let patient of patients">
        <td>
          <div class="user-info">
            <div class="avatar">{{ patient.name[0] }}</div>
            <span>{{ patient.name }}</span>
          </div>
        </td>
        <td>{{ patient.cpf }}</td>
        <td>{{ patient.email }}<br /><small>{{ patient.phone }}</small></td>
        <td><span class="badge success">Active</span></td>
        <td>
          <button class="icon-btn"><i class="edit-icon"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```
