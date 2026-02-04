import { Routes } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { roleGuard } from '../../guards/role.guard';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    component: PatientsComponent,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'physician', 'patient'] }
  },
  {
    path: 'new',
    component: PatientFormComponent,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'physician'] }
  },
  {
    path: ':id/edit',
    component: PatientFormComponent,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'physician'] }
  }
];
