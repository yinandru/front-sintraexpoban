import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
  const token = localStorage.getItem('token');

  if (!token) {
    this.router.navigate(['/login']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.email !== 'admin@gmail.com') {
      this.router.navigate(['/']);
      return false;
    }

    return true;

  } catch {
    this.router.navigate(['/login']);
    return false;
  }
}
}