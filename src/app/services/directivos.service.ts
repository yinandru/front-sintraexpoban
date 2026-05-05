import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DirectivosService {

  private url = 'http://localhost:3000/directivos';

  constructor(private http: HttpClient) {}

  obtener() {
    return this.http.get<any[]>(this.url);
  }

  crear(data: FormData) {
    return this.http.post(this.url, data);
  }

  actualizar(id: number, data: FormData) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}