import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'patients',
    loadChildren: () => import('./modules/patients/patients.routes').then(m => m.PATIENT_ROUTES)
  }
];
