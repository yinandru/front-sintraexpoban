import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SweetAlertService } from '../../../services/sweet-alert.service'; // 👈 NUEVO IMPORT

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent {

  name = '';
  email = '';
  password = '';
  role = 'user';
  idEditando: any;
  usuario: any;

  usuarios: any[] = [];
  

  constructor(
    private authService: AuthService,
    private sweetAlertService: SweetAlertService // 👈 INYECTADO
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.authService.getUsers().subscribe((data: any) => {
      this.usuarios = data;
    });
  }

  isLoading: boolean = false;

  crearUsuario() {
    this.isLoading = true;
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.sweetAlertService.success('Usuario', '✅ Usuario creado correctamente');
        this.name = '';
        this.email = '';
        this.password = '';
        this.role = 'user';
        this.cargarUsuarios();
        this.isLoading = false;
      },
      error: () => {
        this.sweetAlertService.error('Usuario', '❌ Error al crear el usuario');
        this.isLoading = false;
      }
    });
  }

  eliminar(id: number) {
    this.sweetAlertService.confirm('¿Eliminar usuario?', '¿Estás seguro que deseas eliminar este usuario?')
      .then((result) => {
        if (result.isConfirmed) {
          this.authService.deleteUser(id).subscribe({
            next: () => {
              this.sweetAlertService.success('Usuario', '🗑️ Usuario eliminado correctamente');
              this.cargarUsuarios();
            },
            error: () => {
              this.sweetAlertService.error('Usuario', '❌ Error al eliminar el usuario');
              this.isLoading = false;
            }
          });
        }
      });
  }
}
