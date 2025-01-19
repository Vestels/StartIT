import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const authRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['/jobs']);
    return false;
  } else {
    return true;
  }
};

export const employerRedirectGuard: CanActivateFn = () => {
  const currentUser = JSON.parse(localStorage.getItem('User') || '{}');
  const router = inject(Router);

  if (currentUser && currentUser.company_name) {
    router.navigate(['/main-page']);
    return false;
  } else {
    return true;
  }
};