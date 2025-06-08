import { Component, EventEmitter, Input, OnChanges , Output, SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnChanges {
  @Input() reservations: Reservation[] = [];

  @Input() day: string = ''; 
  @Input() hour: string = ''; 

  selectedUser: string = '';

  startDateTime: string = ''; 
  endDateTime: string = '';
  endhour: string = '';

  services: string[] = ['Sala 1', 'Sala 2', 'Sala 3'];
  availableservices: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['day'] || changes['hour']) && this.day && this.hour) {
      this.startDateTime = `${this.day}T${this.hour}`;
      this.updateEndDateTime();
    }
  }

  onFechaChange() {
    if (this.day && this.hour) {
      this.startDateTime = `${this.day}T${this.hour}`;
      this.updateEndDateTime();
    }
  }

  onhourChange() {
    if (this.day && this.hour) {
      this.startDateTime = `${this.day}T${this.hour}`;
      this.updateEndDateTime();
    }
  }

  updateEndDateTime() {
    const start = new Date(this.startDateTime);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hour

    this.endDateTime = end.toISOString().slice(0, 16);
    this.endhour = this.endDateTime.slice(11, 16); // extraigo solo la hour para el input readonly
    this.checkAvailability();
  }

  checkAvailability() {
    if (!this.startDateTime || !this.endDateTime) {
      this.availableservices = [];
      return;
    }

    const start = new Date(this.startDateTime).getTime();
    const end = new Date(this.endDateTime).getTime();

    this.availableservices = this.services.filter(service => {
      return !this.reservations.some(res => {
        if (res.service !== service) return false;

        const resStart = new Date(res.start).getTime();
        const resEnd = new Date(res.end).getTime();

        return start < resEnd && end > resStart; // conflicto hourrio
      });
    });
  }

  makeReservation(service: string) {
    if (!this.selectedUser || !this.startDateTime || !this.endDateTime) {
      alert('Debes completar todos los campos.');
      return;
    }

    const start = new Date(this.startDateTime).getTime();
    const end = new Date(this.endDateTime).getTime();

    const hasConflict = this.reservations.some(res => {
      if (res.service !== service) return false;
      const resStart = new Date(res.start).getTime();
      const resEnd = new Date(res.end).getTime();
      return start < resEnd && end > resStart;
    });

    if (hasConflict) {
      alert(`El espacio ${service} ya está reservado en ese hourrio.`);
      return;
    }

    const newReservation: Reservation = {
      id: this.reservations.length + 1,
      user: this.selectedUser,
      service: service,
      start: this.startDateTime.replace('T', ' '),
      end: this.endDateTime.replace('T', ' ')
    };

    this.reservations.push(newReservation);
    alert(`Reserva confirmada en ${service} para ${this.selectedUser}.`);
    this.checkAvailability();
  }
  onEndHourChange() {
  if (this.day && this.endhour) {
    this.endDateTime = `${this.day}T${this.endhour}`;
    this.checkAvailability();
  }
}

}