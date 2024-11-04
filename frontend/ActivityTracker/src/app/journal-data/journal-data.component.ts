import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { UserSharedService } from '../shared/user-shared.service';
import { IconsService } from '../services/icons.service';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from 'src/app/animations';
import { DatePipe } from '@angular/common';
import { AnalysisAlgorithmService } from '../services/analysis-algorithm.service';
import { ScoreService } from '../services/score.service';
import { forkJoin } from 'rxjs';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { ActivitySharedService } from '../shared/activity-shared.service';

@Component({
  selector: 'app-journal-data',
  standalone: true,
  imports: [CommonModule, DatePipe, ProgressBarComponent],
  animations: [slideInAnimation],
  templateUrl: './journal-data.component.html',
  styleUrl: './journal-data.component.scss'
})
export class JournalDataComponent implements OnInit {

  constructor(private activityService: ActivityService, private userData: UserSharedService,
              private iconsService: IconsService,
              private datePipe: DatePipe,
              public analysis: AnalysisAlgorithmService,
              private scoreService: ScoreService,
              private activityData: ActivitySharedService
  ){}

  currentDate: Date = new Date();
  currentMonthNumber: number = this.currentDate.getMonth() + 1;
  year: number = this.currentDate.getFullYear();
  monthName: string = this.currentDate.toLocaleString('default', {month: 'long'});
  i: number = 0;
  totalScore: number = 0;

  activities: any[] = [];
  scores: any[] = [];
  trainings: any[] = [];
  minutes: any[] = [];
  hours: any[] = [];
  icons = this.iconsService.icons;
  ngOnInit(): void {
    this.loadData();
    setTimeout(() => {
      this.totalScore = 100;
    }, 200);
  }

  private loadData(): void {
    forkJoin({
      activities: this.activityService.getAllData(this.userData.userID!),
      scores: this.scoreService.getScores(this.userData.userID!),
      trainings: this.activityService.getAllTrainings()
    }).subscribe({
      next: ({ activities, scores, trainings }) => {
        this.activities = activities;
        this.scores = scores;
        this.trainings = trainings;
        console.log(this.scores);
        console.log(this.trainings);
        this.processData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private processData(): void {

    for (let i = 0; i < this.activities.length; i++) {
      let activity = this.activities[i];

      if (activity.steps == null) {
        activity.steps = 'Brak danych';
      }
      if (activity.water == null) {
        activity.water = 'Brak danych';
      }
      if (activity.sleepTime != null) {
        let hours = Math.floor(activity.sleepTime / 60);
        let remainingMinutes = activity.sleepTime % 60;
        this.hours[i] = hours;
        this.minutes[i] = remainingMinutes;
      }
      if (activity.calories == null) {
        activity.calories = 'Brak danych';
      }

      const score = this.scores.find(s => s.activityDataID === activity.id);
      if (score) {
        activity.stepsScore = score.stepsScore;
        activity.caloriesScore = score.caloriesScore;
        activity.sleepScore = score.sleepScore;
        activity.waterScore = score.waterScore;
        activity.overall = score.overall;
      }
      const training = this.trainings.find(t => t.activityDataID === activity.id);
      if (training) {
        activity.trainingTime = training.trainingTime;
        activity.trainingType = training.trainingType;
        activity.trainingScore = training.trainingScore;
      }
    }
    this.activities.reverse();
  }


}
