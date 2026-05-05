import { CanActivateFn } from '@angular/router';

export const gestionGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Debes iniciar sesión');
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    return (
      payload.role === 'admin' ||
      payload.role === 'user'
    );

  } catch {
    return false;
  }
};