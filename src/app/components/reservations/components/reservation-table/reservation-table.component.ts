import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-reservation-table',
  imports: [CommonModule, FormsModule, MatSelectModule , MatFormFieldModule ],
  templateUrl: './reservation-table.component.html',
  styleUrl: './reservation-table.component.scss'
})
export class ReservationTableComponent implements OnInit, OnChanges {
  @Input() reservations: any[] = [];
  @Input() services: string[] = [];
  @Output() create = new EventEmitter<string>();
  @Output() edit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();

  editingReservation: any = null;
  hours: string[] = [];

  uniqueservices: string[] = [];
  selectedservice: string = '';

  ngOnInit() {
    this.initservices();
    this.generateHourSlots();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initservices();
    this.generateHourSlots();
  }

  initservices() {
    const servicesFromReservations = this.reservations.map(r => r.service);
    const allservices = [...this.services, ...servicesFromReservations];
    this.uniqueservices = [...new Set(allservices)];

    if (this.uniqueservices.length > 0 && !this.selectedservice) {
      this.selectedservice = this.uniqueservices[0];
    }
  }


  generateHourSlots() {
    const startHour = 7;
    const endHour = 22;
    this.hours = [];

    const occupiedHours = new Set<number>();

    // Filtrar por espacio seleccionado
    const filtered = this.reservations.filter(r => r.service === this.selectedservice);

    filtered.forEach(res => {
      const start = new Date(res.start).getHours();
      const end = new Date(res.end).getHours();
      for (let h = start + 1; h < end; h++) {
        occupiedHours.add(h);
      }
    });

    for (let i = startHour; i <= endHour; i++) {
      if (!occupiedHours.has(i)) {
        const hour = i.toString().padStart(2, '0') + ':00';
        this.hours.push(hour);
      }
    }
  }

  getReservationByHour(hour: string) {
    const hourNumber = parseInt(hour.split(':')[0], 10);
    return this.reservations.find(r => {
      const resHour = new Date(r.start).getHours();
      return resHour === hourNumber && r.service === this.selectedservice;
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

