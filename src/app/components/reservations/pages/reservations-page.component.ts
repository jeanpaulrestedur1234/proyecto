import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { ReservationCalendaryComponent } from '../components/reservation-calendary/reservation-calendary.component';
import { ReservationTableComponent } from '../components/reservation-table/reservation-table.component';
import { ReservationsBarChartComponent } from '../components/reservations-bar-chart/reservations-bar-chart.component';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


@Component({
  standalone: true,
  selector: 'app-reservations-page',
  imports: [CommonModule, ReservationCalendaryComponent, ReservationTableComponent, ReservationsBarChartComponent],
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css']
})
export class ReservationsPageComponent implements OnInit {
  reservations: Reservation[] = [];
  selectedDayReservations: Reservation[] = [];
  editingReservation: Reservation | null = null;
  isModalOpen = false;
  selectedDate=''

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservations = this.reservationService.getReservations();
  }

  openModalForDay(day: Date) {
    const selectedDate = day.toISOString().split('T')[0];
    this.selectedDayReservations = this.reservationService.getReservationsByDate(selectedDate);
    this.selectedDate = format(day, 'EEEE, dd MMMM yyyy', { locale: es });
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onEdit(reservation: Reservation) {
    this.editingReservation = { ...reservation };
  }

  onCancel(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation.id);
    this.refreshReservations();
    this.selectedDayReservations = this.selectedDayReservations.filter(r => r.id !== reservation.id);
  }

  saveEdit() {
    if (this.editingReservation) {
      this.reservationService.updateReservation(this.editingReservation);
      this.refreshReservations();
      this.editingReservation = null;
    }
  }

  onCreate() {
    console.log('Creando nueva reserva');
    // Implementar creación
  }

  private refreshReservations() {
    this.reservations = this.reservationService.getReservations();
  }
}
