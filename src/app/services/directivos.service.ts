import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DirectivosService {

  private url = 'https://backend-sintraexpoban.onrender.com/directivos';

  constructor(private http: HttpClient) {}

  obtener() {
    return this.http.get<any[]>(this.url);
  }

  crear(data: FormData) {

    const token = localStorage.getItem('token');

    return this.http.post(this.url, data, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
  }

  actualizar(id: number, data: FormData) {

    const token = localStorage.getItem('token');

    return this.http.put(`${this.url}/${id}`, data, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
  }

  eliminar(id: number) {

    const token = localStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
  }
}