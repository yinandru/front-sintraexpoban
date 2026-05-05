import { Component } from '@angular/core';
import { HistoriaComponent } from './historia/historia.component';
import { MisionComponent } from './mision/mision.component';
import { VisionComponent } from './vision/vision.component';
import { JuntaDirectivaComponent } from './junta-directiva/junta-directiva.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [
    CommonModule,
    HistoriaComponent,
    MisionComponent,
    VisionComponent,
    JuntaDirectivaComponent
  ],
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css'
})
export class SobreNosotrosComponent {
  seccion: string = 'historia';
}