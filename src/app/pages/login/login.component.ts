import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly sweetAlertService = inject(SweetAlertService);

  public form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)])
  });
  public isLoadingButton = signal(false);

  login() {
    this.isLoadingButton.set(true);
    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe((res: any) => {
  
      console.log('RESPUESTA 👉', res);
  
      // ❌ SI HAY ERROR
      if (!res.access_token) {
        this.sweetAlertService.error('Error al iniciar sesión', res.message);
        return;
      }
      
      // ✅ SI TODO BIEN
      this.isLoadingButton.set(false);
      this.authService.guardarToken(res.access_token);
  
      this.router.navigate(['/']).then(() => {
        location.reload();
      });
    });
    }
  }

/* import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
  this.http.post<any>('http://localhost:3000/auth/login', {
    email: this.email,
    password: this.password
  }).subscribe((res) => {

    console.log('TOKEN 👉', res); // 👈 AGREGA ESTO

    localStorage.setItem('token', res.access_token);

    this.router.navigate(['/noticias']);
  });
}
} */