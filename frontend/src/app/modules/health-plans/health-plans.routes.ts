import { Routes } from '@angular/router';
import { HealthPlansComponent } from './health-plans.component';
import { HealthPlanFormComponent } from './health-plan-form/health-plan-form.component';

import { roleGuard } from '../../guards/role.guard';

export const HEALTH_PLAN_ROUTES: Routes = [
  {
    path: '',
    component: HealthPlansComponent,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'health_plan'] }
  },
  {
    path: 'new',
    component: HealthPlanFormComponent,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'health_plan'] }
  },
  {
    path: ':id/edit',
    component: HealthPlanFormComponent,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'health_plan'] }
  }
];
