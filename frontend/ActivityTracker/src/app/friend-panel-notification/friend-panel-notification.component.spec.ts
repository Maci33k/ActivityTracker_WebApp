import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendPanelNotificationComponent } from './friend-panel-notification.component';

describe('FriendPanelNotificationComponent', () => {
  let component: FriendPanelNotificationComponent;
  let fixture: ComponentFixture<FriendPanelNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendPanelNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendPanelNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
