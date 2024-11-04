import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsActivitiesComponent } from './settings-activities.component';

describe('SettingsActivitiesComponent', () => {
  let component: SettingsActivitiesComponent;
  let fixture: ComponentFixture<SettingsActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
