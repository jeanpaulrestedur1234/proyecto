import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationsModule } from './reservations/ reservations.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReservationsModule
  ]
})
export class AppModule {}
