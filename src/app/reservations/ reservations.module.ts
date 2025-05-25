import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  exports: [
    CommonModule,
    FormsModule,
     MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
    
    
  ]
})
export class ReservationsModule {}
