import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { filter, take, switchMap, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const supabase = inject(SupabaseService);
  const router   = inject(Router);

  // Espera a que la sesión inicial esté cargada antes de evaluar
  return supabase.ready$.pipe(
    filter(ready => ready),
    take(1),
    switchMap(() => supabase.user$.pipe(
      take(1),
      map(user => {
        if (user && supabase.isAdmin()) return true;
        return router.createUrlTree(['/admin/login']);
      })
    ))
  );
};
