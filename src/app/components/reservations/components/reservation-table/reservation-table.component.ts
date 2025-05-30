import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-reservation-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-table.component.html',
  styleUrl: './reservation-table.component.scss'
})
export class ReservationTableComponent {
  @Input() reservations: any[] = [];
  @Output() create = new EventEmitter<string>(); // hora (ej. "10:00")
  @Output() edit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();

  editingReservation: any = null;

  hours: string[] = [];

  ngOnInit() {
    this.generateHourSlots();
  }

  generateHourSlots() {
    const startHour = 7;
    const endHour = 22;
    for (let i = startHour; i <= endHour; i++) {
      const hour = i.toString().padStart(2, '0') + ':00';
      this.hours.push(hour);
    }
  }

  getReservationByHour(hour: string) {
    return this.reservations.find(r => {
      const startHour = new Date(r.start).getHours();
      return startHour === parseInt(hour.split(':')[0], 10);
    });
  }

  createReservation(hour: string) {
    this.create.emit(hour);
  }

  editReservation(reservation: any) {
    this.editingReservation = { ...reservation };
    this.edit.emit(reservation);
  }

  cancelReservation(reservation: any) {
    this.editingReservation = null;
    this.cancel.emit(reservation);
  }

  saveReservation() {
    this.save.emit(this.editingReservation);
    this.editingReservation = null;
  }
}
