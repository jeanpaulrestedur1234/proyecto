import { Routes } from '@angular/router';
import { ReservationsPageComponent } from './components/reservations/pages/reservations-page.component';
import { LoginPageComponent } from './components/auth/pages/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent }, // Ruta para login

  {
    path: '',
    component: HomeComponent, 
    children: [
      { path: '', redirectTo: 'reservation', pathMatch: 'full' }, // Redirección por defecto
      { path: 'reservation', component: ReservationsPageComponent } 
    ]
  },

  { path: '**', redirectTo: '' } // Ruta comodín
];
