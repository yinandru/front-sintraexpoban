import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivosService } from '../../../services/directivos.service'; // 👈 IMPORTANTE
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { SweetAlertService } from '../../../services/sweet-alert.service'; // 👈 NUEVO IMPORT

@Component({
  selector: 'app-junta-directiva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './junta-directiva.component.html',
  styleUrls: ['./junta-directiva.component.css']
})
export class JuntaDirectivaComponent implements OnInit {

  directivos: any[] = [];
  mostrarModal = false;
  editando = false;
  idEditando: number | null = null;

  form: any = {
    nombre: '',
    cargo: ''
  };

  imagenFile: File | null = null;
  imagenSeleccionada: any;

  constructor(
    private service: DirectivosService,
    private auth: AuthService,
    private sweetAlertService: SweetAlertService // 👈 INYECTADO
  ) {}

  ngOnInit() {
    this.cargar();
  }

  puedeGestionarJunta(): boolean {
    return this.auth.puedeGestionarJunta();
  }

  seleccionarImagen(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  cargar() {
    this.service.obtener().subscribe(data => this.directivos = data);
  }

  abrirModal() {
    this.mostrarModal = true;
    this.editando = false;
    this.form = {};
    this.imagenFile = null;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  public isLoading: boolean = false; // 👈 nueva propiedad

  guardar() {
    this.isLoading = true; // activar spinner
    
    const formData = new FormData();
    formData.append('nombre', this.form.nombre);
    formData.append('cargo', this.form.cargo);

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    if (this.editando && this.idEditando !== null) {
      // ✏️ EDITAR
      this.service.actualizar(this.idEditando, formData)
        .subscribe({
          next: () => {
            this.sweetAlertService.success('Directivo', '✏️ Directivo actualizado correctamente');
            this.cargar();
            this.cerrarModal();
          },
          error: () => {
            this.sweetAlertService.error('Directivo', '❌ Error al actualizar el directivo');
          }
        });

    } else {
      // ➕ CREAR
      this.service.crear(formData)
        .subscribe({
          next: () => {
            this.sweetAlertService.success('Directivo', '✅ Directivo creado correctamente');
            this.cargar();
            this.cerrarModal();
          },
          error: () => {
            this.sweetAlertService.error('Directivo', '❌ Error al crear el directivo');
          }
        });
    }
  }

  editar(d: any) {
    this.form = { ...d };
    this.idEditando = d.id;
    this.editando = true;
    this.mostrarModal = true;
  }

  confirmarEliminar(id: number) {
    this.sweetAlertService.confirm('¿Eliminar directivo?', '¿Estás seguro que deseas eliminar este directivo?')
      .then((result) => {
        if (result.isConfirmed) {
          this.eliminar(id);
        }
      });
  }

  eliminar(id: number) {
    this.service.eliminar(id)
      .subscribe({
        next: () => {
          this.sweetAlertService.success('Directivo', '🗑️ Directivo eliminado correctamente');
          this.cargar();
        },
        error: () => {
          this.sweetAlertService.error('Directivo', '❌ Error al eliminar el directivo');
        }
      });
  }

  esAdmin(): boolean {
    return this.auth.esAdmin();
  }
}