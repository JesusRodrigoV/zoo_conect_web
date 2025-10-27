import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  /*
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const requiredRoles = route.data['requiredRoles'] as string[];

  if (!authStore.isAuthenticated()) {
    router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }

  if (requiredRoles?.length > 0) {
    const userRole = authStore.userRole();
    const userRoleName = userRole?.nombre;
    
    if (!userRoleName || !requiredRoles.includes(userRoleName)) {
      router.navigate(['/no-autorizado']);
      return false;
    }
  }
  */

  return true;
};

export const loginGuard: CanActivateFn = () => {
  /*
  const router = inject(Router);
  const authStore = inject(AuthStore);

  if (authStore.isAuthenticated()) {
    router.navigate(['/inicio']);
    return false;
  }
    */

  return true;
};
