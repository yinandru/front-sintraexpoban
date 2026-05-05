import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', './inicio-second.component.css']
})
export class InicioComponent implements OnInit {
cerrarModal() {
throw new Error('Method not implemented.');
}

  noticias: any[] = [];
  noticiaSeleccionada: any = null;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.noticiasService.obtenerNoticias()
      .subscribe((data: any[]) => {

        // 🔥 tomar solo las últimas 3 noticias
        this.noticias = data.slice(0, 3);

      });
  }

  verNoticia(noticia: any) {
    this.noticiaSeleccionada = noticia;
  }

  cerrar() {
    this.noticiaSeleccionada = null;
  }
  
}