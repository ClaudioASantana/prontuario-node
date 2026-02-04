import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

export const USERS_ROUTES: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id/edit', component: UserFormComponent }
];
