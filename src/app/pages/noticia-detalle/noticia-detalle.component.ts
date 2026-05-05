import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-noticia-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './noticia-detalle.component.html',
  styleUrls: ['./noticia-detalle.component.css']
})
export class NoticiaDetalleComponent implements OnInit {

  noticia: any;
  noticiaSeleccionada: any;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private sanitizer: DomSanitizer
  ) {}

  sanitizar(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.noticiasService.obtenerNoticias()
      .subscribe((data: any[]) => {
        this.noticia = data.find(n => n.id === id);
      });
  }
  
}

