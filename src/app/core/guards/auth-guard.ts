import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth)
  const router = inject(Router)

  if (auth.token) return true;
  router.navigate(['/auth/sign-in']);
  return false
};
