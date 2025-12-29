import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Store the attempted URL for redirecting
  // localStorage.setItem('redirectUrl', state.url);
  return router.createUrlTree(['/login']);
};

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/']); // Redirect to dashboard if already logged in
  }

  return true;
};
