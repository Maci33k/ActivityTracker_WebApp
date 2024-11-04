import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourDayComponent } from './your-day.component';

describe('YourDayComponent', () => {
  let component: YourDayComponent;
  let fixture: ComponentFixture<YourDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
