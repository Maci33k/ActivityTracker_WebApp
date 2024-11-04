import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from 'src/app/animations';
import { slideInFromLeftAnimation } from 'src/app/animations';
import { AchievementsSharedService } from 'src/app/shared/achievements-shared.service';
import { AchievementsService } from 'src/app/services/achievements.service';
import { UserSharedService } from 'src/app/shared/user-shared.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  animations: [slideInAnimation, slideInFromLeftAnimation],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent {

  constructor(protected achievementData: AchievementsSharedService, private achievementService: AchievementsService,
              private userData: UserSharedService
  ){}

  isTooltipVisible1 = false;
  isTooltipVisible2 = false;
  isTooltipVisible3 = false;
  isTooltipVisible4 = false;
  isTooltipVisible5 = false;
  isTooltipVisible6 = false;
  tooltipTop = 0;
  tooltipLeft = 0;
  hideTimeout: any;

  showTooltip(event: MouseEvent, id: string) {
    if (id === '5') {
      this.isTooltipVisible1 = true;
      this.isTooltipVisible2 = false;
      this.isTooltipVisible3 = false;
      this.isTooltipVisible4 = false;
      this.isTooltipVisible5 = false;
      this.isTooltipVisible6 = false;
    }
    if(id == '10') {
      this.isTooltipVisible2 = true;
      this.isTooltipVisible1 = false;
      this.isTooltipVisible3 = false;
      this.isTooltipVisible4 = false;
      this.isTooltipVisible5 = false;
      this.isTooltipVisible6 = false;
    }
    if(id == '15') {
      this.isTooltipVisible2 = false;
      this.isTooltipVisible1 = false;
      this.isTooltipVisible3 = true;
      this.isTooltipVisible4 = false;
      this.isTooltipVisible5 = false;
      this.isTooltipVisible6 = false;

    }
    if(id == 'steps') {
      this.isTooltipVisible2 = false;
      this.isTooltipVisible1 = false;
      this.isTooltipVisible3 = false;
      this.isTooltipVisible4 = true;
      this.isTooltipVisible5 = false;
      this.isTooltipVisible6 = false;
    }
    if(id == 'week') {
      this.isTooltipVisible2 = false;
      this.isTooltipVisible1 = false;
      this.isTooltipVisible3 = false;
      this.isTooltipVisible4 = false;
      this.isTooltipVisible5 = true;
      this.isTooltipVisible6 = false;
    }
    if(id == 'perfect') {
      this.isTooltipVisible2 = false;
      this.isTooltipVisible1 = false;
      this.isTooltipVisible3 = false;
      this.isTooltipVisible4 = false;
      this.isTooltipVisible5 = false;
      this.isTooltipVisible6 = true;
    }
    this.tooltipTop = event.clientY + 10;
    this.tooltipLeft = event.clientX + 10;
    if (this.hideTimeout)
      clearTimeout(this.hideTimeout);
  }

  startHideTooltipTimeout(id: string): void {
    this.hideTimeout = setTimeout(() => {
      if (id === '5')
        this.isTooltipVisible1 = false;
      if(id === '10')
        this.isTooltipVisible2 = false;
      if(id === '15')
        this.isTooltipVisible3 = false;
      if(id === 'steps')
        this.isTooltipVisible4 = false;
      if(id === 'week')
        this.isTooltipVisible5 = false;
      if(id === 'perfect')
        this.isTooltipVisible6 = false;

    }, 300);
  }

  hideTooltip(id: string) {
    if(id == '5')
     this.isTooltipVisible1 = false;
    if(id == '10')
      this.isTooltipVisible2 = false;
    if(id == '15')
      this.isTooltipVisible3 = false;
    if(id == 'steps')
      this.isTooltipVisible4 = false;
    if(id == 'week')
      this.isTooltipVisible5 = false;
    if(id == 'perfect')
      this.isTooltipVisible6 = false;
  }

  cancelHideTooltip(): void {
    if (this.hideTimeout)
      clearTimeout(this.hideTimeout);
    }

  pinAchievement(achievementName: string)
  {
    if(this.achievementData.pinnedAchievement1 == null || this.achievementData.pinnedAchievement1 == '') {
      this.achievementData.pinnedAchievement1 = achievementName;
      this.achievementService.putPinnedAchievement1(this.userData.userID!, achievementName).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else if(this.achievementData.pinnedAchievement2 == null || this.achievementData.pinnedAchievement2 == '') {
      this.achievementData.pinnedAchievement2 = achievementName;
      this.achievementService.putPinnedAchievement2(this.userData.userID!, achievementName).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else {
      this.achievementData.pinnedAchievement3 = achievementName;
      this.achievementService.putPinnedAchievement3(this.userData.userID!, achievementName).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}
