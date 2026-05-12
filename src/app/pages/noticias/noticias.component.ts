import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, QuillModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css', './noticias-second.component.css']
})

export class NoticiasComponent implements OnInit {

  paginaActual: number = 1;
  noticiasPorPagina: number = 8;

  /* modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  }; */

  // public Editor = ClassicEditor;
  noticias: any[] = [];
  noticiaSeleccionada: any = null;
  editando: boolean = false;
  idEditando: number | null = null;

  // 🔥 CONTROL DEL FORMULARIO
  mostrarFormulario: boolean = false;

  titulo = '';
  contenido = '';
  imagen: File | null = null;
  noticia: any;

  constructor(
    private authService: AuthService,
    private noticiasService: NoticiasService,
    private sanitizer: DomSanitizer
  ) {}

  sanitizar(html: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.cargarNoticias();
  }

  esAdmin(): boolean {
  return this.authService.esAdmin();
  }

  // 🔥 CARGAR NOTICIAS
  cargarNoticias() {
  this.noticiasService.obtenerNoticias()
    .subscribe({
      next: (data: any[]) => {
        console.log('DATOS BACKEND:', data); // 👈 CLAVE
        this.noticias = data.sort((a, b) => b.id - a.id);
      },
      error: (err) => {
        console.error('ERROR:', err);
      }
    });
    
  }

    resumen(html: string): string {
    const textoPlano = html.replace(/<[^>]+>/g, ''); // quitar HTML
    return textoPlano.length > 80 
    ? textoPlano.substring(0, 80) + '...' 
    : textoPlano;
    }

    get noticiasPaginadas() {
    const inicio = (this.paginaActual - 1) * this.noticiasPorPagina;
    const fin = inicio + this.noticiasPorPagina;
    return this.noticias.slice(inicio, fin);
    }

    get totalPaginas(): number {
    return Math.ceil(this.noticias.length / this.noticiasPorPagina);
    }

    cambiarPagina(numero: number) {
      if (numero >= 1 && numero <= this.totalPaginas) {
        this.paginaActual = numero;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }

  
  verDetalle(noticia: any) {
    this.noticiaSeleccionada = noticia;
  }

  cerrarModal() {
    this.noticiaSeleccionada = null;
  }

  seleccionarImagen(event: any) {
    this.imagen = event.target.files[0];
  }

  guardarNoticia() {

    console.log('TITULO 👉', this.titulo);
    console.log('CONTENIDO 👉', this.contenido);
  
    const contenidoLimpio = this.contenido
      ?.replace(/<(.|\n)*?>/g, '')
      ?.trim();
  
    if (!this.titulo.trim() || !contenidoLimpio) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    const formData = new FormData();
  
    formData.append('titulo', this.titulo);
    formData.append('contenido', this.contenido);
  
    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }
  
    // 🔥 EDITAR
    if (this.editando && this.idEditando !== null) {
  
      this.noticiasService.editarNoticia(this.idEditando, formData)
        .subscribe({
          next: () => {
            alert('Noticia actualizada');
            this.resetForm();
            this.cargarNoticias();
          },
          error: (err) => {
            console.error('ERROR BACKEND 👉', err);
            alert('Error al actualizar');
          }
        });
  
      }
  
    // 🔥 CREAR
    else {
  
      this.noticiasService.crearNoticia(formData)
        .subscribe({
          next: () => {
            alert('Noticia creada');
            this.resetForm();
            this.cargarNoticias();
          },
          error: (err) => {
            console.error('ERROR BACKEND 👉', err);
            alert('Error al crear noticia');
          }
        });
  
      }
  
  }
  resetForm() {
    // throw new Error('Method not implemented.');
    this.titulo = '';
    this.contenido = '';
    this.imagen = null;
    this.editando = false;
    this.idEditando = null;
    this.mostrarFormulario = false;
    }

    eliminar(id: number) {
    if (confirm('¿Eliminar esta noticia?')) {
    this.noticiasService.eliminarNoticia(id)
      .subscribe(() => {
        this.noticias = this.noticias.filter(n => n.id !== id);
      });
    }
  }

  editar(noticia: any) {
    this.titulo = noticia.titulo;
  
    setTimeout(() => {
      this.contenido = noticia.contenido;
    });
  
    this.idEditando = noticia.id;
    this.editando = true;
    this.mostrarFormulario = true;
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } // 🔥 PRO

  puedeGestionar(): boolean {
  return this.authService.puedeGestionarNoticias();
  }

}

