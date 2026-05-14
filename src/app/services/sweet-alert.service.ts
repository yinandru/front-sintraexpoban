import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  // -------------------------------
  // Alertas predefinidas
  // -------------------------------

  success(title: string, text?: string): Promise<SweetAlertResult> {
    return this.fire(title, text, 'success');
  }

  error(title: string, text?: string): Promise<SweetAlertResult> {
    return this.fire(title, text, 'error');
  }

  warning(title: string, text?: string): Promise<SweetAlertResult> {
    return this.fire(title, text, 'warning');
  }

  info(title: string, text?: string): Promise<SweetAlertResult> {
    return this.fire(title, text, 'info');
  }

  question(title: string, text?: string): Promise<SweetAlertResult> {
    return this.fire(title, text, 'question');
  }

  // -------------------------------
  // Confirmación
  // -------------------------------
  confirm(
    title: string = '¿Estás seguro?',
    text: string = 'Esta acción no se puede deshacer',
    confirmButtonText: string = 'Sí, continuar',
    cancelButtonText: string = 'Cancelar'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true // para que el botón de confirmar quede a la derecha según usabilidad
    });
  }

  // -------------------------------
  // Prompt (entrada de texto)
  // -------------------------------
  prompt(
    title: string,
    inputPlaceholder: string = '',
    inputType: 'text' | 'email' | 'password' | 'number' | 'textarea' = 'text',
    confirmButtonText: string = 'Aceptar',
    cancelButtonText: string = 'Cancelar'
  ): Promise<SweetAlertResult<string>> {
    return Swal.fire({
      title,
      input: inputType,
      inputPlaceholder,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un valor';
        }
        return null;
      }
    });
  }

  // -------------------------------
  // Toast (notificación pequeña)
  // -------------------------------
  toast(
    title: string,
    icon: SweetAlertIcon = 'success',
    timer: number = 3000,
    position: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end' = 'top-end'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      toast: true,
      position,
      icon,
      title,
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }

  // -------------------------------
  // Genérico / personalizado
  // -------------------------------
  fire(title: string, text?: string, icon?: SweetAlertIcon): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: '#3085d6'
    });
  }

  /**
   * Permite usar cualquier configuración de SweetAlert2
   */
  custom(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(options);
  }

  // -------------------------------
  // Carga (loading)
  // -------------------------------
  showLoading(title: string = 'Procesando...', text?: string): void {
    Swal.fire({
      title,
      text: text ?? 'Por favor espera',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  close(): void {
    Swal.close();
  }
}