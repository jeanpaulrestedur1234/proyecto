// app.Routes.ts
import { Routes } from '@angular/router';
import { ReservationsPageComponent } from './components/reservations/pages/reservations-page.component';  // Importa tus componentes
import { LoginPageComponent } from './components/auth/pages/login-page/login-page.component';
export const routes: Routes = [
  { path: '', component: LoginPageComponent },  // Ruta por defecto, página de reservas
  { path: '**', redirectTo: '' } ,
   { path: 'Reservation', component: ReservationsPageComponent },  // Ruta para el login
];
