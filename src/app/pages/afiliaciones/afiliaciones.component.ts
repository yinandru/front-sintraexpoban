import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-afiliaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './afiliaciones.component.html',
  styleUrls: ['./afiliaciones.component.css'] // 👈 también corregido (S)
})
export class AfiliacionesComponent {

  // 🔥 CONTROL FAQ
  activeIndex: number | null = null;

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  // 🔥 FORMULARIO
  formulario;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      // documento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
      // empresa: ['', Validators.required],
    });
  }

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.value;
  
    const numeroWhatsapp = '573105482715'; 
    // 👆 reemplaza por el número real del sindicato
    // formato: código país + número
    // Colombia = 57
  
    const mensaje = `Hola, quiero afiliarme a SINTRAEXPOBAN
  
    Nombre: ${datos.nombre}
    Correo: ${datos.email}
    Teléfono: ${datos.telefono}
    
    Mensaje:
    ${datos.mensaje}`;
    
      const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    
        window.open(url, '_blank');
      
        this.formulario.reset();
  }

  scrollFormulario() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}