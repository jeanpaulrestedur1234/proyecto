import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { ReservationCalendaryComponent } from '../components/reservation-calendary/reservation-calendary.component';
import { ReservationsBarChartComponent } from '../components/reservations-bar-chart/reservations-bar-chart.component';
import { ReservationTableComponent } from '../components/reservation-table/reservation-table.component';
import {ReservationFormComponent} from '../components/reservation-form/reservation-form.component';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-reservations-page',
  imports: [CommonModule, ReservationCalendaryComponent, ReservationsBarChartComponent,ReservationTableComponent,ReservationFormComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.scss']
})
export class ReservationsPageComponent implements OnInit {
  filterSelected: 'day' | 'month' | 'all' = 'all';
  filteredReservations: Reservation[] = [];
  referenceDate = new Date();
    
  reservations: Reservation[] = [];
  selectedDayReservations: Reservation[] = [];
  editingReservation: Reservation | null = null;
  isModalOpen = false;
  isFormOpen =false;
  selectedDate='';
  formSelectedDate='';
  formSelectedHour='';


  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservations = this.reservationService.getReservations();
    this.filterReservations();
  }

  openModalForDay(day: Date) {
    const selectedDate = day.toISOString().split('T')[0];
    this.formSelectedDate = selectedDate ;
    this.selectedDayReservations = this.reservationService.getReservationsByDate(selectedDate);
    this.selectedDate = format(day, 'EEEE, dd MMMM yyyy', { locale: es });
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isFormOpen = false;
    this.editingReservation = null;
    this.formSelectedDate = '';
    this.formSelectedHour = '';
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
  openReservationForm(hour: string) {
    this.formSelectedHour= hour
    this.isFormOpen=true;


  }
  filterReservations() {
  const today = this.referenceDate ;
  const currentMonth =this.referenceDate.getMonth();
  const currentYear = this.referenceDate.getFullYear();

  if (this.filterSelected === 'day') {
    this.filteredReservations = this.reservations.filter(res => {
      const resDate = new Date(res.start);
      return resDate.toDateString() === today.toDateString();
    });
  } else if (this.filterSelected === 'month') {
    this.filteredReservations = this.reservations.filter(res => {
      const resDate = new Date(res.start);
      return resDate.getMonth() === currentMonth && resDate.getFullYear() === currentYear;
    });
  } else {
    this.filteredReservations = [...this.reservations];
  }
}
 setReferenceday(day: Date){
  this.referenceDate=day;
  this.filterReservations()


 }

  private refreshReservations() {
    this.reservations = this.reservationService.getReservations();
  }
}
