import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const auth = inject(Auth);
  const router = inject(Router)

  const allowedRole = (route.data['role'] ?? []) as string[];
  const role = auth.currentUser?.role;

  if(role && allowedRole.includes(role)) return true;
  router.navigate(['/']);
  return false;
};
