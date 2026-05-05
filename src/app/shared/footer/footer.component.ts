import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  constructor(private router: Router) {}

  irA(ruta: string) {
    this.router.navigate([ruta]).then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

}