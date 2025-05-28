import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsBarChartComponent } from './reservations-bar-chart.component';

describe('ReservationsBarChartComponent', () => {
  let component: ReservationsBarChartComponent;
  let fixture: ComponentFixture<ReservationsBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
