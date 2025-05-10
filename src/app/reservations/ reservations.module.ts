import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationTableComponent } from './components/reservation-table/reservation-table.component';
import { ReservationsPageComponent } from './pages/reservations-page.component';

@NgModule({
  imports: [
    CommonModule,
    ReservationsPageComponent, // Importar el componente standalone aquí
    ReservationTableComponent
  ]
})
export class ReservationsModule {}
