import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivosService } from '../../../services/directivos.service'; // 👈 IMPORTANTE
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-junta-directiva',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './junta-directiva.component.html',
  styleUrls: ['./junta-directiva.component.css']
})
export class JuntaDirectivaComponent {

  puedeGestionarJunta(): boolean {
    return this.auth.puedeGestionarJunta();
  }

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

  seleccionarImagen(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  constructor(
    private service: DirectivosService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.cargar();
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


  guardar() {

    const formData = new FormData();
  
    formData.append('nombre', this.form.nombre);
    formData.append('cargo', this.form.cargo);
  
    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }
  
    if (this.editando && this.idEditando !== null) {
      // ✏️ EDITAR
      this.service.actualizar(this.idEditando, formData)
        .subscribe(() => {
          alert('✏️ Directivo actualizado correctamente');
          this.cargar();
          this.cerrarModal();
        });
  
    } else {
      // ➕ CREAR
      this.service.crear(formData)
        .subscribe(() => {
           alert('✅ Directivo creado correctamente');
          this.cargar();
          this.cerrarModal();
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
    if (confirm('¿Eliminar directivo?')) {
      this.eliminar(id);
    }
  }

  eliminar(id: number) {
    this.service.eliminar(id)
      .subscribe(() => this.cargar());
  }

  esAdmin(): boolean {
  return this.auth.esAdmin();
  }
}

/* import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivosService } from '../../services/directivos.service';

@Component({
  selector: 'app-junta-directiva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './junta-directiva.component.html',
  styleUrls: ['./junta-directiva.component.css']
})
export class JuntaDirectivaComponent implements OnInit {

  directivos: any[] = [];

  constructor(private service: DirectivosService) {}

    ngOnInit() {
      this.cargar();
    }
    
    cargar() {
      this.service.obtener()
        .subscribe(data => this.directivos = data);
    }
    
    eliminar(id: number) {
      this.service.eliminar(id)
        .subscribe(() => this.cargar());
    }
    
  // ngOnInit() {
  //   this.cargarDirectivos();
  // }

  cargarDirectivos() {
    // 🔥 TEMPORAL (luego viene del backend)
    this.directivos = [
      {
        id: 1,
        nombre: 'Fredy Florez Rojano',
        cargo: 'Presidente',
        imagen: 'assets/images/fredy-florez.jpg'
      },
      {
        id: 2,
        nombre: 'Juan Pablo Silgado',
        cargo: 'Vicepresidente',
        imagen: 'assets/images/juan-pablo-silgado.jpg'
      },
      {
        id: 3,
        nombre: 'Hector Enrique Arroyo',
        cargo: 'Fiscal',
        imagen: 'assets/images/hector-enrique-arroyoo.jpg'
      },
      {
        id: 4,
        nombre: 'Ricardo Penagos',
        cargo: 'Tesorero',
        imagen: 'assets/images/ricardo-penagos.jpg'
      }
    ];
  }

  esAdmin(): boolean {
  return true; // luego lo conectas con AuthService
}

editar(directivo: any) {
  console.log('Editar', directivo);
}

} */