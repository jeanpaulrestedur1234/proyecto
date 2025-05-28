import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationsModule } from './components/reservations/ reservations.module';
import { AppComponent } from './app.component';
import { ReservationsBarChartComponent } from './components/reservations/components/reservations-bar-chart/reservations-bar-chart.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReservationsModule,
    NgModule,
    AppComponent,
    ReservationsBarChartComponent
  ]
})
export class AppModule {}
