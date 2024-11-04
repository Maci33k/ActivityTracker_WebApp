import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTrainingComponent } from './pop-up-training.component';

describe('PopUpTrainingComponent', () => {
  let component: PopUpTrainingComponent;
  let fixture: ComponentFixture<PopUpTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpTrainingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
