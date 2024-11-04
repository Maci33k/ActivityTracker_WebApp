import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsService } from 'src/app/services/icons.service';
import { slideInAnimation } from 'src/app/animations';
import { NotificationsComponent } from "../../notifications/notifications.component";
import { RouterModule } from '@angular/router';
import { UserSharedService } from 'src/app/shared/user-shared.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ActivitySharedService } from 'src/app/shared/activity-shared.service';
import { ScoreService } from 'src/app/services/score.service';
import { ScoresSharedService } from 'src/app/shared/scores-shared.service';
import { GoalsService } from 'src/app/services/goals.service';
import { GoalsSharedService } from 'src/app/shared/goals-shared.service';

@Component({
  selector: 'app-your-day',
  standalone: true,
  imports: [CommonModule, NotificationsComponent, RouterModule],
  animations: [slideInAnimation],
  templateUrl: './your-day.component.html',
  styleUrl: './your-day.component.scss'
})
export class YourDayComponent implements OnInit, OnDestroy {
  constructor(public iconService: IconsService, protected userData: UserSharedService,
              private activityData: ActivitySharedService,
              private activityService: ActivityService,
              private scoreService: ScoreService,
              private scoreData: ScoresSharedService,
              private goalService: GoalsService,
              private goalsData: GoalsSharedService
  ){}

  tileClicked: boolean = false;
  currentTime: string = '';
  private intervalId: any;

     months: string[] = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
  ];

   today: Date = new Date();

   day: number = this.today.getDate();
   month: string = this.months[this.today.getMonth()];
   year: number = this.today.getFullYear();

   formattedDate: string = `${this.day} ${this.month} ${this.year}`;

  ngOnInit(): void {
      this.updateTime();
      this.saveLastActivityRecord();
      this.userData.loadFromLocalStorage();
      this.getGoals();
      this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
      if(this.intervalId) {
        clearInterval(this.intervalId);
      }
  }

  toggleExpand(event: Event) {
    const target = event.currentTarget as HTMLElement;
    target.classList.toggle('expanded');
    this.tileClicked = !this.tileClicked;
  }

  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  saveLastActivityRecord() {
    this.activityService.getTodaysRecordID(this.userData.userID!).subscribe({
      next: (id) => {
        this.saveLastScoresRecord(id);
        this.activityService.getSingleRecord(id).subscribe({
          next: (res) => {
            console.log(res);
            this.activityData.steps = res.steps;
            this.activityData.callories = res.calories;
            this.activityData.water = res.water;
            this.activityData.sleepTime = res.sleepTime;
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  saveLastScoresRecord(id: number) {
    this.scoreService.getTodayScoreRecord(id).subscribe({
      next: (res) => {
        console.log(res);
        this.scoreData.stepsScore = res.stepsScore;
        this.scoreData.caloriesScore = res.caloriesScore;
        this.scoreData.sleepScore = res.sleepScore;
        this.scoreData.waterScore = res.waterScore;
        this.scoreData.nextSteps = res.nextSteps;
        this.scoreData.nextWater = res.nextWater;
        this.scoreData.nextCalories = res.nextCalories;
        this.scoreData.nextSleep = res.nextSleep;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getGoals() {
    this.goalService.getGoals(this.userData.userID!).subscribe({
      next: (goals: any) => {
        console.log(goals);
        this.goalsData.stepsGoal = goals.steps;
        this.goalsData.caloriesGoal = goals.calories;
        this.goalsData.waterGoal = goals.water;
      },
      error: (err) => {
        console.log(err);
        if(this.userData.userID != null && this.userData.userID != 0) {
          this.postGoalsRecord();
          console.log('error sie wywolal');
        }
      }
    });
  }

  postGoalsRecord() {
    this.goalService.postGoals(this.userData.userID!).subscribe({
      next: (res) => {
        console.log(res);
        this.getGoals();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
