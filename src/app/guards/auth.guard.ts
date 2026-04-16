import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const supabase = inject(SupabaseService);
  const router   = inject(Router);

  return supabase.user$.pipe(
    take(1),
    map(user => {
      if (user && supabase.isAdmin()) return true;
      return router.createUrlTree(['/admin/login']);
    })
  );
};
