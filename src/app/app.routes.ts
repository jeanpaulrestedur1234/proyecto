// app.Routes.ts
import { Routes } from '@angular/router';
import { ReservationsPageComponent } from './reservations/pages/reservations-page.component';  // Importa tus componentes

export const routes: Routes = [
  { path: '', component: ReservationsPageComponent },  // Ruta por defecto, página de reservas
  { path: '**', redirectTo: '' }  // Ruta comodín para redirigir a la página principal si la ruta no existe
];
