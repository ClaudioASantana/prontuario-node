import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { authGuard, publicGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'patients',
        loadChildren: () => import('./modules/patients/patients.routes').then(m => m.PATIENT_ROUTES)
      }
    ]
  }
];
