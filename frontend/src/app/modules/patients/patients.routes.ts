import { Routes } from '@angular/router';
import { PatientsComponent } from './patients.component';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    component: PatientsComponent,
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./patient-form/patient-form.component').then((m) => m.PatientFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./patient-form/patient-form.component').then((m) => m.PatientFormComponent),
  },
];
