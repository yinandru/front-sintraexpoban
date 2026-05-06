import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

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

  constructor(private authService: AuthService) {}

  crearUsuario() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(data).subscribe(() => {
      alert('Usuario creado ✅');
      this.name = '';
      this.email = '';
      this.password = '';
      this.role = 'user';
    });
  }

  usuarios: any[] = [];

  ngOnInit() {
  this.cargarUsuarios();
  }

  cargarUsuarios() {
  this.authService.getUsers().subscribe((data: any) => {
    this.usuarios = data;
  });
  }

  eliminar(id: number) {
  if (confirm('¿Eliminar usuario?')) {
    this.authService.deleteUser(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }
  }

  /* editar(user: any) {
  this.name = user.name;
  this.email = user.email;
  this.role = user.role;
  this.idEditando = user.id;
  } */
}