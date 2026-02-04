import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { authGuard, publicGuard } from './guards/auth.guard';

import { roleGuard } from './guards/role.guard';

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
        path: 'users',
        loadChildren: () => import('./modules/users/users.routes').then(m => m.USERS_ROUTES),
        canActivate: [roleGuard],
        data: { roles: ['admin'] } // Only admins can access user management
      },
      {
        path: 'patients',
        loadChildren: () => import('./modules/patients/patients.routes').then(m => m.PATIENT_ROUTES)
      },
      {
        path: 'health-plans',
        loadChildren: () => import('./modules/health-plans/health-plans.routes').then(m => m.HEALTH_PLAN_ROUTES)
      }
    ]
  }
];
