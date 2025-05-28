import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private reservations: Reservation[] = [
    { id: 1, user: 'Juan', space: 'Sala 1', start: '2025-05-09 10:00', end: '2025-05-09 12:00' },
    { id: 2, user: 'Daniel', space: 'Sala 1', start: '2025-05-09 10:00', end: '2025-05-09 12:00' },
    { id: 6, user: 'Ana', space: 'Sala 2', start: '2025-05-10 14:00', end: '2025-05-10 16:00' },
  ];

  getReservations(): Reservation[] {
    return [...this.reservations];
  }

  getReservationsByDate(date: string): Reservation[] {
    return this.reservations.filter(r => r.start.startsWith(date));
  }

  updateReservation(updated: Reservation) {
    const index = this.reservations.findIndex(r => r.id === updated.id);
    if (index !== -1) this.reservations[index] = updated;
  }

  deleteReservation(id: number) {
    this.reservations = this.reservations.filter(r => r.id !== id);
  }
}
