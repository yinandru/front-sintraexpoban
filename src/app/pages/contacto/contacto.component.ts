import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  formulario;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
    });
  }

    enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
  
    const nombre = this.formulario.value.nombre;
    const email = this.formulario.value.email;
    const mensaje = this.formulario.value.mensaje;
  
    const texto = `Hola, deseo comunicarme con SINTRAEXPOBAN
  
  Nombre: ${nombre}
  Correo: ${email}
  
  Mensaje:
  ${mensaje}`;
  
    const numero = '573105482715'; // 👈 reemplaza por el número real
  
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  
    window.open(url, '_blank');
  
    this.formulario.reset();
  }

  abrirWhatsApp() {
    const numero = '573105482715'; // CAMBIA POR TU NÚMERO
    const mensaje = 'Hola, quiero información sobre SINTRAEXPOBAN';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
}