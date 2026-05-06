import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NoticiasService } from '../../services/noticias.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
esSuperAdmin(): boolean {
  return this.authService.esSuperAdmin();
}
esAdmin(): boolean {
  return this.authService.esAdmin() 
}

puedeGestionarNoticias(): boolean {
  return this.authService.puedeGestionarNoticias();
}

puedeGestionarJunta(): boolean {
  return this.authService.puedeGestionarJunta();
}

  constructor(private authService: AuthService,
    private noticiasService: NoticiasService
  ) {}

  totalNoticias = 0;
  totalUsuarios = 0;

  ngOnInit() {
    this.noticiasService.obtenerNoticias()
      .subscribe((data: any[]) => this.totalNoticias = data.length);
  
    /* this.authService.obtenerUsuarios()
      .subscribe(data => this.totalUsuarios = data.length); */
  }

  getNombre() {
  return this.authService.getUserName();
  }

  getUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email;
  }
  
}

