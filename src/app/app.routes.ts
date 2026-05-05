// TypeScript

import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { adminGuard } from './guards/admin.guard';
import { gestionGuard } from './guards/gestion.guard';

import { InicioComponent } from './pages/inicio/inicio.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { AfiliacionesComponent } from './pages/afiliaciones/afiliaciones.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { JuntaDirectivaComponent } from './pages/sobre-nosotros/junta-directiva/junta-directiva.component';
import { NoticiaDetalleComponent } from './pages/noticia-detalle/noticia-detalle.component';
import { HistoriaComponent } from './pages/sobre-nosotros/historia/historia.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'historia', component: HistoriaComponent},
  { path: 'noticias', component: NoticiasComponent },
  
  {
    path: 'noticias/:id',
    loadComponent: () => import('./pages/noticia-detalle/noticia-detalle.component')
      .then(m => m.NoticiaDetalleComponent)
  },

  { path: 'afiliaciones', component: AfiliacionesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'junta-directiva', component: JuntaDirectivaComponent },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component')
      .then(m => m.LoginComponent)
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [gestionGuard]
  },

  {
  path: 'admin/usuarios',
  loadComponent: () => import('./pages/admin/usuarios/usuarios.component')
    .then(m => m.UsuariosComponent),
  canActivate: [adminGuard]
  }
];
