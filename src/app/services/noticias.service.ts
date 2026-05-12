import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private apiUrl = 'https://backend-sintraexpoban.onrender.com/noticias';

  constructor(private http: HttpClient) {}

  obtenerNoticias() {
    return this.http.get<any[]>('https://backend-sintraexpoban.onrender.com/noticias');
  }

  crearNoticia(data: any) {
    const token = localStorage.getItem('token');
  
    return this.http.post('https://backend-sintraexpoban.onrender.com/noticias', data, {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  }

  eliminarNoticia(id: number) {
    const token = localStorage.getItem('token');

    return this.http.delete(`https://backend-sintraexpoban.onrender.com/noticias/${id}`, {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  }

  editarNoticia(id: number, data: any) {
    const token = localStorage.getItem('token');

    return this.http.put(`https://backend-sintraexpoban.onrender.com/noticias/${id}`, data, {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  }

}