import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],  // Aquí se importa FormsModule
  selector: 'ReservationTableComponent',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent {
  @Input() reservations: any[] = [];
  @Input() editingReservation: any = null;
  @Output() edit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();

  // Emitir evento de editar
  editReservation(reservation: any) {
    this.edit.emit(reservation);
  }

  // Emitir evento de cancelar
  cancelReservation(reservation: any) {
    this.cancel.emit(reservation);
  }

  // Guardar cambios de edición
  saveReservation() {
    this.save.emit();
  }
}
