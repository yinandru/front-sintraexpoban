import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  esSuperAdmin // 🔥 OBTENER TOKEN
    (): boolean {
    throw new Error('Method not implemented.');
  }

  private API = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(data: any) {
  return this.http.post(`${this.API}/register`, data);
  }

  // 🔥 LOGIN
  login(data: any) {
    return this.http.post(`${this.API}/login`, data);
  }

  // 🔥 GUARDAR TOKEN
  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  // 🔥 OBTENER TOKEN
  getToken() {
    return localStorage.getItem('token');
  }

  /* estaLogueado(): boolean {
    return !!this.getToken();
  } */

  // 🔥 VERIFICAR ADMIN
  esAdmin(): boolean {
    const token = this.getToken();

    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      console.log('PAYLOAD 👉', payload); // 👈 AGREGA ESTO

      return payload.role === 'admin' || payload.role === 'superadmin';
    } catch {
      return false;
    }
  }

  // 🔥 LOGOUT
  logout() {
    localStorage.removeItem('token');
  }

  getUserName(): string {
  const token = this.getToken();

  if (!token) return '';

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.name || payload.email;
  } catch {
    return '';
  }
  }

  getUsers() {
  return this.http.get(`${this.API}/users`);
  }

  deleteUser(id: number) {
  return this.http.delete(`${this.API}/users/${id}`);
  }

  puedeGestionarNoticias(): boolean {
    const token = this.getToken();
  
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('PAYLOAD REAL 👉', payload); // 🔥 IMPORTANTE
      return payload.role === 'admin' || payload.role === 'user' || payload.role === 'superadmin';
    } catch {
      return false;
    }
  }

  puedeGestionarJunta(): boolean {
    const token = this.getToken();
  
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'admin' || payload.role === 'user' || payload.role === 'superadmin';
    } catch {
      return false;
    }
  }
}