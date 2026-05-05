import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
  this.authService.login({
    email: this.email,
    password: this.password
  }).subscribe((res: any) => {

    console.log('RESPUESTA 👉', res);

    // ❌ SI HAY ERROR
    if (!res.access_token) {
      alert(res.message || 'Error en login');
      return;
    }

    // ✅ SI TODO BIEN
    this.authService.guardarToken(res.access_token);

    alert('Login correcto');

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