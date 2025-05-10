import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { isSameDay } from 'date-fns';
@Component({
  selector: 'ReservationCalendaryComponent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-calendary.component.html',
  styleUrls: ['./reservation-calendary.component.css']
})
export class ReservationCalendaryComponent {
  @Input() reservations: any[] = [];
  @Input() editingReservation: any;

  @Output() edit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();

  currentDate = new Date();
  daysInMonth: Date[] = [];
  today = new Date();

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const start = startOfMonth(this.currentDate);
    const end = endOfMonth(this.currentDate);
    this.daysInMonth = eachDayOfInterval({ start, end });
  }

  getReservationsForDay(day: Date) {
    const dateStr = format(day, 'yyyy-MM-dd');
    return this.reservations.filter(r => r.start.startsWith(dateStr));
  }

  onEdit(reservation: any) {
    this.edit.emit(reservation);
  }

  onCancel(reservation: any) {
    this.cancel.emit(reservation);
  }

  onSave() {
    this.save.emit();
  }

   isToday(date: Date): boolean {
    const today = this.today;
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate();
  }

}
