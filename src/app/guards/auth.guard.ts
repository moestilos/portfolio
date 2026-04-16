import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (sessionStorage.getItem('moe_admin') === 'true') return true;
  return router.createUrlTree(['/admin/login']);
};
