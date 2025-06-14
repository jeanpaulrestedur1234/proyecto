import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  standalone: true,
  selector: 'app-reservations-barchart',
  templateUrl: './reservations-bar-chart.component.html',
  styleUrl: './reservations-bar-chart.component.scss',
  imports: [CommonModule, NgChartsModule],
})
export class ReservationsBarChartComponent implements OnInit {

  // 📥 Datos de entrada
  @Input() reservations: { id: number; user: string; service: string; start: string; end: string; }[] = [];
  @Input() title: string = 'Reservas por sala';
  @Input() columns: number = 1; // Para CSS personalizado

  barChartType: ChartType = 'bar';
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: this.title }
    }
  };
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  ngOnInit() {
    this.generateChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateChartData();
  }

  generateChartData() {
    if (!this.reservations || this.reservations.length === 0) {
      this.barChartData = {
        labels: [],
        datasets: []
      };
      this.barChartOptions.plugins = {
        ...this.barChartOptions.plugins,
        title: { display: true, text: this.title }
      };
      return;
    }

    const roomCounts: { [room: string]: number } = {};

    this.reservations.forEach(res => {
      roomCounts[res.service] = (roomCounts[res.service] || 0) + 1;
    });

    const labels = Object.keys(roomCounts);
    const data = Object.values(roomCounts);

    const palette = ['#E0E0E0', '#B0B0B0', '#888888', '#4A4A4A'];
    const backgroundColors = labels.map((_, i) => palette[i % palette.length]);

    this.barChartData = {
      labels,
      datasets: [
        {
          data,
          label: this.title,
          backgroundColor: backgroundColors,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: '#ffffff'
        }
      ]
    };

    this.barChartOptions.plugins = {
      ...this.barChartOptions.plugins,
      title: { display: true, text: this.title }
    };
  }


}
