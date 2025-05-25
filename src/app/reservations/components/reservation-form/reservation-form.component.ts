import { Component, Input } from '@angular/core';
import { ReservationsModule } from '../../ reservations.module';
interface Reservation {
  id: number;
  user: string;
  space: string;
  start: string;
  end: string;
}

@Component({
  selector: 'ReservationFormComponent',
  standalone: true,
  imports: [
    ReservationsModule
  ],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  @Input() reservations: Reservation[] = []; // recibe las reservas

  spaces: string[] = ['Sala 1', 'Sala 2', 'Sala 3'];
  @Input() selectedMonth: string = '02'; // recibe el mes desde el padre
 
  selectedDate: string = '';
  availableSpaces: string[] = [];
  isModalOpen = false;

  openModal() {
    if (!this.selectedMonth) {
      alert('Debes seleccionar un mes antes de hacer una reserva.');
      return;
    }

    this.isModalOpen = true;
    this.selectedDate = '';
    this.availableSpaces = [];
  }

  closeModal() {
    this.isModalOpen = false;
  }

  checkAvailability() {
    if (!this.selectedDate || !this.selectedMonth) return;

    const selectedDateTime = new Date(this.selectedDate);
    const [year, month] = this.selectedMonth.split('-');

    if (
      selectedDateTime.getFullYear() !== +year ||
      selectedDateTime.getMonth() + 1 !== +month
    ) {
      alert('La fecha seleccionada no pertenece al mes elegido.');
      this.availableSpaces = [];
      return;
    }

    const startTimestamp = selectedDateTime.getTime();
    const endTimestamp = startTimestamp + 2 * 60 * 60 * 1000;

    this.availableSpaces = this.spaces.filter(space => {
      return !this.reservations.some(res => {
        if (res.space !== space) return false;

        const resStart = new Date(res.start).getTime();
        const resEnd = new Date(res.end).getTime();
        return (startTimestamp < resEnd && endTimestamp > resStart);
      });
    });
  }

  makeReservation(space: string) {
    const startTime = new Date(this.selectedDate);
    const [year, month] = this.selectedMonth.split('-');

    if (
      startTime.getFullYear() !== +year ||
      startTime.getMonth() + 1 !== +month
    ) {
      alert('Solo puedes hacer reservaciones dentro del mes seleccionado.');
      return;
    }

    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

    this.reservations.push({
      id: this.reservations.length + 1,
      user: 'Nuevo Usuario',
      space: space,
      start: startTime.toISOString().slice(0, 16).replace('T', ' '),
      end: endTime.toISOString().slice(0, 16).replace('T', ' ')
    });

    alert(`Reserva realizada en ${space}`);
    this.checkAvailability();
  }
}
