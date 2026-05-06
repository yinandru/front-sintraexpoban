import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('No tienes acceso');
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.role === 'admin' || payload.role === 'superadmin';

  } catch {
    return false;
  }
};