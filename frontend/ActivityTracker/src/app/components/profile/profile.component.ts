import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/animations';
import { UserSharedService } from 'src/app/shared/user-shared.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../progress-bar/progress-bar.component";
import { LevelInfoService } from 'src/app/shared/level-info.service';
import { AchievementsSharedService } from 'src/app/shared/achievements-shared.service';
import { AchievementsService } from 'src/app/services/achievements.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  animations: [slideInAnimation],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  constructor(protected userData: UserSharedService, private userService: UserServiceService,
              public lvlData: LevelInfoService,
              public achievementData: AchievementsSharedService,
              private achievementService: AchievementsService
  ){}



  email: string = this.userData.email!;
  username: string = this.userData.username!;
  name: string = this.userData.name!;
  surname: string = this.userData.surname!;
  age: number = this.userData.age!;
  gender: string = this.userData.gender!;
  city: string = this.userData.city!;
  userPhoto: any;
  experience: number = 0;

  ngOnInit(): void {
      this.getUserPhoto();
      console.log('LVL: ', this.lvlData.currentLevel);

        setTimeout(() => {
          this.experience = this.lvlData.experience;
        }, 100);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.userService.uploadFile(file, this.userData.userID!);
    }
  }

 getUserPhoto() {
    this.userService.getUserPhoto(this.userData.userID!)
      .subscribe((data: Blob) => {
        const reader = new FileReader();
     reader.onloadend = () => {
          this.userPhoto = reader.result;
         this.getUserPhoto();
       }
        reader.readAsDataURL(data);
     }, error => {
        console.error('Error fetching user photo:', error);
      });
  }

  removeAchievement(achievementNumber: number) {
    if(achievementNumber == 1 && (this.achievementData.pinnedAchievement1 != null || this.achievementData.pinnedAchievement1 != '')) {
      this.achievementService.putPinnedAchievement1(this.userData.userID!, '').subscribe({
        next: (res) => {
          console.log(res);
          this.achievementData.pinnedAchievement1 = '';
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else if(achievementNumber == 2 && (this.achievementData.pinnedAchievement2 != null || this.achievementData.pinnedAchievement2 != '')) {
      this.achievementService.putPinnedAchievement2(this.userData.userID!, '').subscribe({
        next: (res) => {
          console.log(res);
          this.achievementData.pinnedAchievement2 = '';
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else if(achievementNumber == 3 && (this.achievementData.pinnedAchievement3 != null || this.achievementData.pinnedAchievement3 != '')) {
      this.achievementService.putPinnedAchievement3(this.userData.userID!, '').subscribe({
        next: (res) => {
          console.log(res);
          this.achievementData.pinnedAchievement3 = '';
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
