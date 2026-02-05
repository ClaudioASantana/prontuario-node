import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * Landing Guard - Redirects authenticated users to dashboard
 * Allows only non-authenticated users to view the landing page
 */
export const landingGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // User is already logged in, redirect to dashboard
    router.navigate(['/dashboard']);
    return false;
  }

  // User is not authenticated, allow access to landing page
  return true;
};
