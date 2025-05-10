import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationTableComponent } from '../components/reservation-table/reservation-table.component';
import { ReservationCalendaryComponent } from '../components/reservation-calendary/reservation-calendary.component';
@Component({
  standalone: true,
  selector: 'app-reservations-page',
  imports: [CommonModule, ReservationTableComponent, ReservationCalendaryComponent],
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css']
})
export class ReservationsPageComponent {
  reservations = [
    { id: 1, user: 'Juan', space: 'Sala 1', start: '2025-05-09 10:00', end: '2025-05-09 12:00' },
    { id: 1, user: 'Juan', space: 'Sala 1', start: '2025-05-09 10:00', end: '2025-05-09 12:00' },
    { id: 1, user: 'Juan', space: 'Sala 1', start: '2025-05-09 10:00', end: '2025-05-09 12:00' },
    { id: 1, user: 'Juan', space: 'Sala 1', start: '2025-05-09 10:00', end: '2025-05-09 12:00' },
    { id: 1, user: 'Juan', space: 'Sala 1', start: '2025-05-09 10:00', end: '2025-05-09 12:00' },
    { id: 2, user: 'Ana', space: 'Sala 2', start: '2025-05-10 14:00', end: '2025-05-10 16:00' },
  ];
  
  // Reserva en proceso de edición
  editingReservation: any = null;

  // Método que se ejecuta cuando se hace clic en "Editar"
  onEdit(reservation: any) {
    this.editingReservation = { ...reservation }; // Creamos una copia de la reserva para editar
  }

  // Método que se ejecuta cuando se hace clic en "Cancelar"
  onCancel(reservation: any) {
    this.reservations = this.reservations.filter(r => r.id !== reservation.id); // Eliminar reserva de la lista
  }

  // Guardar los cambios de la reserva editada
  saveEdit() {
    if (this.editingReservation) {
      const index = this.reservations.findIndex(r => r.id === this.editingReservation.id);
      if (index !== -1) {
        this.reservations[index] = this.editingReservation;
      }
      this.editingReservation = null; // Limpiar la reserva en edición
    }
  }

  // Método para crear una nueva reserva
  onCreate() {
    console.log('Creando nueva reserva');
    // Lógica para crear una nueva reserva
  }
}
