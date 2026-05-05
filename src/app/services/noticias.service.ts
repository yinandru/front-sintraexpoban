import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private apiUrl = 'http://localhost:3000/noticias';

  constructor(private http: HttpClient) {}

  obtenerNoticias() {
    return this.http.get<any[]>('http://localhost:3000/noticias');
  }

  crearNoticia(data: any) {
    const token = localStorage.getItem('token');
  
    return this.http.post('http://localhost:3000/noticias', data, {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  }

  eliminarNoticia(id: number) {
    const token = localStorage.getItem('token');

    return this.http.delete(`http://localhost:3000/noticias/${id}`, {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  }

  editarNoticia(id: number, data: any) {
    const token = localStorage.getItem('token');

    return this.http.put(`http://localhost:3000/noticias/${id}`, data, {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  }

}