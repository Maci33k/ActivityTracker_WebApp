import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from '../animations';
import { slideInFromLeftAnimation } from '../animations';
import { slideAnimation } from '../animations';
import { fadeSlideAnimation } from '../animations';
import { FriendsService } from '../services/friends.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-friend-profile',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  animations: [slideInAnimation, slideInFromLeftAnimation, slideAnimation, fadeSlideAnimation],
  templateUrl: './friend-profile.component.html',
  styleUrl: './friend-profile.component.scss'
})
export class FriendProfileComponent {
  constructor(private userService: UserServiceService, private route: ActivatedRoute, public friendService: FriendsService){}

  friendId: number = 0;
  friend: any;
   hours: number = 0;
    remainingMinutes: number = 0;
    averageHours: number = 0;
    averageMinutes: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.friendId = +params.get('id')!;
    });
    this.getFriendData();
  }

  getFriendData() {
    this.friendService.getFriendProfileData(this.friendId).subscribe({
      next: (friend) => {
        if (friend) {
          if (friend.image && !friend.image.startsWith('data:image/jpeg;base64,')) {
            friend.image = `data:image/jpeg;base64,${friend.image}`;
          }

        for (const key in friend) {
          if (friend.hasOwnProperty(key)) {
            const value = friend[key];

            if (value === null) {
              friend[key] = 0;
            }
          }
        }

        this.friend = friend;

          console.log('Friend przed przypisaniem: ', friend);
          console.log('Friend with image:', this.friend);
          this.hours = Math.floor(this.friend.lastSleepTime/60);
          this.remainingMinutes = this.friend.lastSleepTime % 60;
          this.averageHours = Math.floor(this.friend.weeklyAverageSleepTime/60);
          this.averageMinutes = this.friend.weeklyAverageSleepTime % 60;
        } else {
          console.warn('No friend data:', friend);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  }

  tooltipVisible1: boolean = false;
  tooltipVisible2: boolean = false;
  tooltipVisible3: boolean = false;
  tooltipVisible4: boolean = false;
  tooltipVisible5: boolean = false;
  tooltipVisible6: boolean = false;

  showTooltip(achievementNumber: number) {
    switch(achievementNumber) {
      case 1:
        this.tooltipVisible1 = true;
        break;
      case 2:
        this.tooltipVisible2 = true;
        break;
      case 3:
        this.tooltipVisible3 = true;
        break;
      case 4:
        this.tooltipVisible4 = true;
        break;
      case 5:
        this.tooltipVisible5 = true;
        break;
      case 6:
        this.tooltipVisible6 = true;
        break;
    }
  }

  hideTooltip() {
    this.tooltipVisible1 = false;
    this.tooltipVisible2 = false;
    this.tooltipVisible3 = false;
    this.tooltipVisible4 = false;
    this.tooltipVisible5 = false;
    this.tooltipVisible6 = false;
  }

}
