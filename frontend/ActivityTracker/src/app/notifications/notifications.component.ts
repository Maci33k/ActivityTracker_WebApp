import { Component, OnInit } from '@angular/core';
import { YourDayComponent } from "../components/your-day/your-day.component";
import { IconsService } from '../services/icons.service';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from '../animations';
import { slideInFromLeftAnimation } from '../animations';
import { expandFromClickAnimation } from '../animations';
import { fadeSlideAnimation } from '../animations';
import { textAnimation } from '../animations';
import { NotificationService } from '../services/notification.service';
import { UserSharedService } from '../shared/user-shared.service';
import { ActivitySharedService } from '../shared/activity-shared.service';
import { ScoresSharedService } from '../shared/scores-shared.service';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [YourDayComponent, CommonModule],
  animations: [slideInAnimation, slideInFromLeftAnimation, expandFromClickAnimation, fadeSlideAnimation, textAnimation],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {

    constructor(public iconService: IconsService, public notificationService: NotificationService,
                private userData: UserSharedService,
                public activityData: ActivitySharedService,
                public scoreData: ScoresSharedService
    ){}

    notificationTitle: string = 'Spróbuj wykonać więcej kroków';
    advice: string = 'Pilnuj, aby każdy krok był stawiany na całej stopie, co pomoże w utrzymaniu równowagi i zapobiegnie przeciążeniom. Regularnie zwiększaj intensywność i długość kroków, ale zawsze w granicach komfortu, aby zminimalizować ryzyko kontuzji.';
    notifications: any;
    selectedNotification: any = null;
    hours = Math.floor(this.activityData.sleepTime!/60);
    remainingMinutes = this.activityData.sleepTime! % 60;
    nextHours = Math.floor(this.scoreData.nextSleep!/60);
    nextMinutes = Math.floor(this.scoreData.nextSleep!%60);

    ngOnInit(): void {
        this.notificationService.getNotifications(this.userData.userID!, this.activityData.activityDataID!).subscribe({
          next: (data) => {
            console.log(data);
            this.notifications = data;
          },
          error: (err) => {
            console.log(err);
          }
        })
    }


    tileClicked: boolean = false;

    onTileClick(notification: any): void {
      this.selectedNotification = notification;
      this.tileClicked = true;
    }

    toggleExpand() {
      console.log(this.tileClicked);
      this.tileClicked = !this.tileClicked;
    }
}
