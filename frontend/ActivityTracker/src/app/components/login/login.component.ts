import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSharedService } from 'src/app/shared/user-shared.service';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigSharedService } from 'src/app/shared/config-shared.service';
import { TrackedActivitiesModel } from 'src/app/models/tracked-activities.model';
import { LevelService } from 'src/app/services/level.service';
import { LevelInfoService } from 'src/app/shared/level-info.service';
import { GoalsService } from 'src/app/services/goals.service';
import { ActivitySharedService } from 'src/app/shared/activity-shared.service';
import { ActivityService } from 'src/app/services/activity.service';
import { AchievementsService } from 'src/app/services/achievements.service';
import { AchievementsSharedService } from 'src/app/shared/achievements-shared.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('videoBackground') videoElement!: ElementRef<HTMLVideoElement>;
  private routerEventsSubscription!: Subscription;
   email: string = '';
   password: string = '';
   response: any;

  constructor(private router: Router,
     private userService: UserServiceService,
     private snackBar: MatSnackBar,
     private userData: UserSharedService,
     private configService: ConfigService,
     private configData: ConfigSharedService,
     private lvlService: LevelService,
     private lvlData: LevelInfoService,
     private goalsService: GoalsService,
     private activityData: ActivitySharedService,
     private activityService: ActivityService,
     private achievementService: AchievementsService,
     private achievementData: AchievementsSharedService
    ) {}

  ngOnInit() {
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/login') {
        this.playVideo();
      }
    });
  }

  ngAfterViewInit() {
    this.playVideo();
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  playVideo() {
    const video = this.videoElement.nativeElement;
    video.currentTime = 0;
    video.muted = true;
    video.play().catch(error => {
      console.error('Failed to play the video:', error);
      const playOnInteraction = () => {
        video.play().catch(err => {
          console.error('Retry failed:', err);
        });
        document.removeEventListener('click', playOnInteraction);
      };
      document.addEventListener('click', playOnInteraction);
    });
  }

  LogIn() {
    this.verifyUser();
  }

  verifyUser() {
    this.userService.checkUser(this.email, this.password).subscribe({
      next: (data) => {
        this.response = data;
        if(this.response == true) {
          console.log(this.email);
          this.setUserId();
          this.setEmail();
          this.getUserConfig();
          this.router.navigate(['/app/your-day']);
          this.userData.loadFromLocalStorage();
        }
      },
      error: (err) => {
        this.response = err.error;
        this.snackBar.open('Niepoprawne dane logowania', 'Zamknij', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }

  setUserId(): void {
    this.userService.getUserId(this.email).subscribe({
      next: (data: any) => {
        this.userData.userID = data;
        this.setUsername();
        this.getFullUser();
        this.getLevelData(data);
        this.goalsService.getUserGoals();
        this.userData.saveToLocalStorage();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  setEmail(): void {
    this.userData.email = this.email;
  }

  setUsername(): void {
    this.userService.gerUsername(this.userData.userID!).subscribe({
      next: (res) => {
        this.userData.username = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getFullUser(): void {
    this.userService.getFullUserData(this.userData.userID!).subscribe({
      next: (user) => {
        this.userData.name = user.name;
        this.userData.surname = user.surname;
        this.userData.age = user.age;
        this.userData.gender = user.gender;
        this.userData.city = user.city;
        this.userData.userConfigID = user.userConfigID;
        this.userData.email = user.email;
        this.userData.saveToLocalStorage();
        console.log('config ID', user.userConfigID);
        this.getTrackedActivities();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTrackedActivities() {
    this.configService.getTrackedActivities(this.userData.userConfigID!).subscribe({
      next: (data) => {
        console.log("Tracked Activities: ", data);
        this.configData.steps = data.steps;
        this.configData.calories = data.calories;
        this.configData.water = data.water;
        this.configData.sleepTime = data.sleepTime;
        this.configData.training = data.training;
        this.configData.saveToLocalStorage();
        this.configData.loadFromLocalStorage();
        this.getAchievements(this.userData.userID!);
      },
      error: (err) => {
        console.log(err);
        if(this.userData.userConfigID != null) {
          this.postTrackedActivities();
        }
      }
    });
  }

  postTrackedActivities() {

    const trackedActivities: TrackedActivitiesModel = {
      id: 0,
      steps: this.configData.steps,
      calories: this.configData.calories,
      water: this.configData.water,
      sleepTime: this.configData.sleepTime,
      training: this.configData.training
    }

    this.configService.postTrackedActivities(trackedActivities, this.userData.userConfigID!).subscribe({
      next: (res) => {
        console.log(res);
        this.getTrackedActivities();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getLevelData(userID: number) {
    this.lvlService.getLevelData(userID).subscribe({
      next: (lvlData) => {
        console.log(lvlData);
        this.lvlData.experience = lvlData.experience;
        this.lvlData.currentLevel = lvlData.level;
        this.lvlData.nextLevel = lvlData.level + 1;
        this.lvlData.totalExperience = lvlData.totalExperience;
        this.lvlData.nextLevelExperience = this.lvlData.getExpForLevel(lvlData.level + 1);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getAchievements(userID: number) {
    this.achievementService.getAchievementStatuses(userID).subscribe({
      next: (achievements: any) => {
        console.log(achievements);
        this.achievementData.achievement1 = achievements.levelAchievement1;
        this.achievementData.achievement2 = achievements.levelAchievement2;
        this.achievementData.achievement3 = achievements.levelAchievement3;
        this.achievementData.achievement4 = achievements.activityAchievement1;
        this.achievementData.achievement5 = achievements.activityAchievement2;
        this.achievementData.achievement6 = achievements.activityAchievement3;
        this.achievementData.pinnedAchievement1 = achievements.pinnedAchievement1;
        this.achievementData.pinnedAchievement2 = achievements.pinnedAchievement2;
        this.achievementData.pinnedAchievement3 = achievements.pinnedAchievement3;
        this.getUserConfig();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getUserConfig() {
    this.configService.getUserConfig(this.userData.userConfigID!).subscribe({
      next: (data: any) => {
        this.configData.height = data.height;
        this.configData.weight = data.weight;
        this.configData.gender = data.gender;
        this.configData.fitness = data.fitness;
        console.log(data);
        console.log('config data loaded');
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }





}
