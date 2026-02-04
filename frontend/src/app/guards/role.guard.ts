import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { map, take } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const requiredRoles = route.data['roles'] as string[];

  return authService.currentUserRole$.pipe(
    take(1),
    map(role => {
      if (!role) {
        // Not logged in or no role loaded yet
        if (authService.isAuthenticated()) {
           // If authenticated but role not loaded (should not happen with BehaviorSubject init), retry or redirect
           // For now, assuming if authenticated, role is loaded or will be.
           // But authService loadUserRoleFromToken is sync in constructor.
           return router.createUrlTree(['/login']); // Fallback
        }
        return router.createUrlTree(['/login']);
      }

      const hasRole = !requiredRoles || requiredRoles.length === 0 || requiredRoles.includes(role);

      if (hasRole) {
        return true;
      }

      // Role mismatch
      return router.createUrlTree(['/']); // Redirect to dashboard or a "Client Forbidden" page
    })
  );
};
