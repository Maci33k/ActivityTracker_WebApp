import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloriesMonitorComponent } from './callories-monitor.component';

describe('CalloriesMonitorComponent', () => {
  let component: CalloriesMonitorComponent;
  let fixture: ComponentFixture<CalloriesMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalloriesMonitorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalloriesMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
