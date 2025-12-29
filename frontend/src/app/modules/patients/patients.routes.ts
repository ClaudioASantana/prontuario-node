import { Routes } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    component: PatientsComponent
  },
  {
    path: 'new',
    component: PatientFormComponent
  },
  {
    path: ':id/edit',
    component: PatientFormComponent
  }
];
