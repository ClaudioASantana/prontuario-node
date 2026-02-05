import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { authGuard, publicGuard } from './guards/auth.guard';
import { landingGuard } from './guards/landing.guard';
import { LandingPageComponent } from './modules/landing/landing-page.component';

import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  // Landing Page - Public root
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [landingGuard], // Redirects authenticated users to dashboard
  },
  // Authentication routes with role parameter
  {
    path: 'auth/login/:role',
    component: LoginComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'auth/login',
    redirectTo: 'auth/login/patient', // Default to patient login
    pathMatch: 'full',
  },
  {
    path: 'login',
    redirectTo: 'auth/login/patient', // Legacy redirect
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./modules/auth/register.component').then((m) => m.RegisterComponent),
    canActivate: [publicGuard],
  },
  // Protected dashboard and app routes
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/dashboard/dashboard-container.component').then(
            (m) => m.DashboardContainerComponent,
          ),
      },
      {
        path: 'users',
        loadChildren: () => import('./modules/users/users.routes').then((m) => m.USERS_ROUTES),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }, // Only admins can access user management
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./modules/patients/patients.routes').then((m) => m.PATIENT_ROUTES),
      },
      {
        path: 'health-plans',
        loadChildren: () =>
          import('./modules/health-plans/health-plans.routes').then((m) => m.HEALTH_PLAN_ROUTES),
      },
    ],
  },
];
