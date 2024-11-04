import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpGoalComponent } from './pop-up-goal.component';

describe('PopUpGoalComponent', () => {
  let component: PopUpGoalComponent;
  let fixture: ComponentFixture<PopUpGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpGoalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
