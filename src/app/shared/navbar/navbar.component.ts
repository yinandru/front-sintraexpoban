import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // 👈 IMPORTANTE
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly sweetAlertService = inject(SweetAlertService);


  puedeGestionarNoticias(): boolean {
    return this.authService.puedeGestionarNoticias();
  }

  irA(ruta: string) {
    this.router.navigate([ruta]).then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    this.cerrarMenu();
  }

  getNombre() {
  return this.authService.getUserName();
  }

  estaLogueado() {
  return !!this.authService.getToken();
  }

  menuAbierto = false;

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  // 🔥 AHORA USA EL SERVICE
  esAdmin(): boolean {
    return this.authService.esAdmin();
  }

  logout() {
    this.sweetAlertService.confirm('¿Cerrar sesión?', '¿Estás seguro que deseas cerrar la sesión?')
      .then((result) => {
        if (result.isConfirmed) {
          this.authService.logout();
          location.reload();
        }
      });
  }
}