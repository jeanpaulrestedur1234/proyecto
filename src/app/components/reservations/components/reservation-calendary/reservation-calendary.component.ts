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

  currentDate = new Date();
  daysInMonth: Date[] = [];
  today = new Date();

  @Output() daySelected = new EventEmitter<Date>();

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

  onDayClick(day: Date) {
    this.daySelected.emit(day);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  // Aquí calculamos cuántos espacios vacíos antes del primer día para que la semana empiece en lunes
  getLeadingEmptyDays(): number {
    const day = getDay(startOfMonth(this.currentDate)); // 0=domingo ... 6=sábado
    // Convertimos domingo(0) a 6, lunes(1) a 0, martes(2) a 1, etc.
    return (day + 6) % 7;
  }

getBackgroundColor(reservationsCount: number): string {
  const max = 15;
  const clamped = Math.min(reservationsCount, max);
  const t = clamped / max;

  const start = { r: 250, g: 250, b: 250 };  // Blanco cálido
  const end = { r: 23, g: 133, b: 130 };     // Azul turquesa oscuro

  const r = Math.round(start.r + (end.r - start.r) * t);
  const g = Math.round(start.g + (end.g - start.g) * t);
  const b = Math.round(start.b + (end.b - start.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
}



}