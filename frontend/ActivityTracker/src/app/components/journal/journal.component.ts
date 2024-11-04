import { Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from 'src/app/animations';
import { expandAnimation } from 'src/app/animations';
import { FormsModule } from '@angular/forms';
import { fadeSlideAnimation } from 'src/app/animations';
import { UserSharedService } from 'src/app/shared/user-shared.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ActivityModel } from 'src/app/models/activity.model';
import { Observable, timeout } from 'rxjs';
import { AppSharedService } from 'src/app/shared/app-shared.service';
import { IconsService } from 'src/app/services/icons.service';
import { ConfigSharedService } from 'src/app/shared/config-shared.service';
import { ActivitySharedService } from 'src/app/shared/activity-shared.service';
import { AnalysisAlgorithmService } from 'src/app/services/analysis-algorithm.service';
import { ScoreService } from 'src/app/services/score.service';
import { ScoresModel } from 'src/app/models/scores.model';
import { ScoresSharedService } from 'src/app/shared/scores-shared.service';
import { LevelInfoService } from 'src/app/shared/level-info.service';
import { LevelService } from 'src/app/services/level.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpTrainingComponent } from 'src/app/pop-up-training/pop-up-training.component';
import { AchievementsSharedService } from 'src/app/shared/achievements-shared.service';
import { AchievementsService } from 'src/app/services/achievements.service';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [
    DragDropModule,
    CommonModule,
    FormsModule
  ],
  animations: [slideInAnimation, expandAnimation, fadeSlideAnimation],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss'
})
export class JournalComponent implements OnInit {

  todaysRecord: any;
  todayRecordID: number = 0;
  stepsCompleted: boolean = false;
  caloriesCompleted: boolean = false;
  waterCompleted: boolean = false;
  sleepCompleted: boolean = false;
  trainingCompleted: boolean = false;
  tiles: number = 0;
  done: boolean = false;
  completed: boolean = false;


  constructor(private userData: UserSharedService,
              private activityService: ActivityService,
              private appData: AppSharedService,
              private iconsService: IconsService,
              private configData: ConfigSharedService,
              private activityData: ActivitySharedService,
              private analyze: AnalysisAlgorithmService,
              private scoreService: ScoreService,
              private scoresData: ScoresSharedService,
              private lvlData: LevelInfoService,
              private lvlService: LevelService,
              private notificationService: NotificationService,
              public dialog: MatDialog,
              private achievementData: AchievementsSharedService,
              private achievementService: AchievementsService
  ) {}

  ngOnInit(): void {
    this.appData.navBarLocation = 1;
    console.log(this.appData.navBarLocation);
    this.setTrainingScore();
    this.displayNotCompletedFields();
  }

  draggedIcon: any;
  draggedIndex: number | null = null;
  numberOfCustomFields = 0;
  expanded = false;
  numberOfTiles: number = 5;
  numberOfTrackedActivities: number = 5;

  // Variables of activity data prepared to send to the database
  steps: number | null = null;
  callories: number | null = null;
  water: number | null = null; // liters
  sleepTime: number | null = null; // in minutes
  sleepTimeRange = {
    startTime: null as string | null,
    endTime: null as string | null
  }

    // icons = [
   // { name: 'Kroki', class: 'fa-solid fa-shoe-prints', state: 'active' },
   // { name: 'Kalorie', class: 'fa-solid fa-fire', state: 'active' },
   // { name: 'Woda', class: 'fa-solid fa-droplet', state: 'active' },
   // { name: 'Trening', class: 'fa-solid fa-person-running', state: 'active' },
   // { name: 'Sen', class: 'fa-solid fa-moon', state: 'active' }
 // ]

    icons = this.iconsService.icons.slice();
    iconsToRender: any;


  onDragStart(event: DragEvent, icon: any, index: number) {
    this.draggedIcon = icon;
    this.draggedIndex = index;
    event.dataTransfer?.setData('application/json', JSON.stringify(icon));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const element = event.target as HTMLElement;
    element.classList.add('drag-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('application/json');
    const icon = data ? JSON.parse(data) : null;
    const element = event.target as HTMLElement;
    element.classList.remove('drag-over');

    if (element !== event.currentTarget) {

      event.stopPropagation();
      return;
    }

    if (icon && this.numberOfCustomFields < 5) {
      const newElement = document.createElement('i');
      newElement.className = icon.class;
      if(this.numberOfCustomFields == 0) {
        newElement.style.color = 'white';
        newElement.style.fontSize = '300%';
      }
      else if(this.numberOfCustomFields != 0) {
      newElement.style.color = 'white';
      newElement.style.fontSize = '300%';
      newElement.style.marginLeft = '10%';
      }
      element.appendChild(newElement);
    }
    if (this.draggedIndex !== null) {
      this.icons.splice(this.draggedIndex, 1);
      this.draggedIndex = null;
      this.numberOfCustomFields++;
      console.log(this.numberOfCustomFields);
    }
  }

  onDragLeave(event: DragEvent) {
    const element = event.target as HTMLElement;
    element.classList.remove('drag-over');
  }

  toggleState() {
    this.expanded = !this.expanded;
  }

  // logic for data traffic between html and typescript variables
  getModel(iconName: string): any {
    switch (iconName) {
      case 'Kroki':
        return this.steps;
      case 'Kalorie':
        return this.callories;
      case 'Woda':
        return this.water;
      case 'Sen':
        return this.sleepTime;
      default:
        return '';
    }
  }

  setModel(iconName: string, value: any): void {
    switch (iconName) {
      case 'Kroki':
        this.steps = value;
        break;
      case 'Kalorie':
        this.callories = value;
        break;
      case 'Woda':
        this.water = value;
        break;
      case 'Sleep':
        this.sleepTime = value;
      break;
    }
  }

  submit(item: any) {
    console.log(this.steps);
    console.log(this.userData.userID);
    this.removeItem(item);
    this.removeIconByName(item.name);
    this.displayNotCompletedFields();
    this.createActivity();

    setTimeout(() => {
      if(item.name == 'Kroki') {
        this.analyze.analyzeSteps(this.steps!);
        console.log(this.analyze.stepsScore);
        this.scoreService.putNextSteps(this.activityData.activityDataID!, this.analyze.nextSteps).subscribe({
          next: (res) => {
            console.log(res);
            console.log('Probuje dodac next steps', this.analyze.nextSteps);
            this.verifyStepsAchievement();
          },
          error: (err) => {
            console.log(err);
          }
        });
        this.updateTotalScore(this.analyze.stepsScore);
        this.scoreService.putStepsScore(this.analyze.stepsScore, this.activityData.activityDataID!).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
      if(item.name == 'Woda') {
        this.analyze.analyzeWater(this.water!);
        console.log(this.analyze.waterScore);
        this.updateTotalScore(this.analyze.waterScore);
        this.scoreService.putNextWater(this.activityData.activityDataID!, this.analyze.nextWater).subscribe({
          next: (res) => {
            console.log(res);

          },
          error: (err) => {
            console.log(err);
          }
        });
        this.scoreService.putWaterScore(this.analyze.waterScore, this.activityData.activityDataID!).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
      if(item.name == 'Kalorie') {
        this.analyze.analyzeCalories(this.callories!);
        console.log(this.analyze.caloriesScore);
        this.updateTotalScore(this.analyze.caloriesScore);
        this.scoreService.putNextCalories(this.activityData.activityDataID!, this.analyze.nextCalories).subscribe({
          next: (res) => {
            console.log(res);

          },
          error: (err) => {
            console.log(err);
          }
        });
        this.scoreService.putCaloriesScore(this.analyze.caloriesScore, this.activityData.activityDataID!).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
      console.log(item.name);
    }, 1000);
    if(this.scoresData.trainingScore != 0) {
    }
  }


  removeItem(item: any) {
    item.state = 'inactive';
    setTimeout(() => {
      this.icons = this.icons.filter(i => i !== item);
    }, 500);
  }

  submitTime(item: any) {
    if(this.sleepTimeRange.startTime && this.sleepTimeRange.endTime) {
    console.log(this.sleepTimeRange.startTime);
    console.log('end time: ',this.sleepTimeRange.endTime);
    this.calculateSleepTime();
    this.createActivity();
    setTimeout(() => {
      this.analyze.analyzeSleep(this.sleepTime!);
      this.updateTotalScore(this.analyze.sleepScore);
      this.scoreService.putNextSleep(this.activityData.activityDataID!, this.analyze.nextSleep).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.scoreService.putSleepScore(this.analyze.sleepScore, this.activityData.activityDataID!).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }, 1000);
    this.removeItem(item);
    this.removeIconByName('Sen');
    }
  }

  createActivity() {
    this.activityService.checkIfRecordExists(this.userData.userID!).subscribe({
      next: (success) => {
        console.log(success);
        if(success == false && this.todayRecordID == 0) {
        const activityData: ActivityModel =
    {
      id: 0,
      date: new Date(),
      userID: this.userData.userID,
      steps: this.steps,
      calories: this.callories,
      water: this.water,
      sleepTime: this.sleepTime
    }
    this.activityService.createRecord(activityData).subscribe({
      next: (data) => {
        console.log('record created',data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  else {
    this.modifyActivity();
  }
      },
      error: (err) => {
        console.log("Error while checking existing of first record of the day", err);
      }
    })
  }

  modifyActivity() {
    this.activityService.getTodaysRecordID(this.userData.userID!).subscribe({
      next: (id) => {
        const activityData: ActivityModel =
    {
      id: id,
      date: new Date(),
      userID: this.userData.userID,
      steps: this.steps,
      calories: this.callories,
      water: this.water,
      sleepTime: this.sleepTime
    }

    console.log(activityData);
    this.activityService.updateRecord(activityData.id, activityData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  calculateSleepTime() {
    if (this.sleepTimeRange.startTime && this.sleepTimeRange.endTime) {
      const today = new Date();

      const startTimeParts = this.sleepTimeRange.startTime.split(':').map(part => parseInt(part, 10));
      const endTimeParts = this.sleepTimeRange.endTime.split(':').map(part => parseInt(part, 10));
      console.log(startTimeParts);
      console.log(endTimeParts);
      this.activityData.sleepStart = startTimeParts;
      this.activityData.sleepEnd = endTimeParts;

      const startDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startTimeParts[0], startTimeParts[1]);
      const endDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endTimeParts[0], endTimeParts[1]);

      if (endDateTime < startDateTime) {
        endDateTime.setDate(endDateTime.getDate() + 1);
      }

      const diff = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);

      this.sleepTime = diff;
      console.log('Calculated sleep time:', this.sleepTime);
    } else {
      this.sleepTime = null;
    }
  }

  removeIconByName(name: string): void {
    const index = this.icons.findIndex(icon => icon.name === name);
    if (index !== -1) {
      this.icons.splice(index, 1);
    } else {
      console.log(`icon not found ${name}`);
    }
  }

  getTrackedActivities() {
    if(this.configData.calories == false || this.caloriesCompleted == true) {
      this.removeIconByName('Kalorie');
      this.numberOfTiles--;
    }
    if(this.configData.steps == false || this.stepsCompleted == true) {
      this.removeIconByName('Kroki');
      this.numberOfTiles--;
    }
    if(this.configData.training == false || this.trainingCompleted == true) {
      this.removeIconByName('Trening');
      this.numberOfTiles--;
    }
    if(this.configData.water == false || this.waterCompleted == true) {
      this.removeIconByName('Woda');
      this.numberOfTiles--;
    }
    if(this.configData.sleepTime == false || this.sleepCompleted == true) {
      this.removeIconByName('Sen');
      this.numberOfTiles--;
    }
    if(this.configData.training == false || this.trainingCompleted == true) {
      this.removeIconByName('Trening');
      this.numberOfTiles--;
    }
    this.iconsToRender = this.icons;
  }

  displayNotCompletedFields() {
    this.activityService.getTodaysRecordID(this.userData.userID!).subscribe({
      next: (id) => {
        this.todayRecordID = id;
        this.activityData.activityDataID = this.todayRecordID;
        console.log('Today record ID', id);
        this.setDoneInfo();
        this.addScoresRecord();
        this.selectNotCompletedFields();
      },
      error: (err) => {
        console.log(err);
        setTimeout(() => {
          if(this.userData.userID != null && this.userData.userID != 0 && this.todayRecordID == 0) {
            this.createActivity();
            this.displayNotCompletedFields();
          }
      }, 1000);
       // if(this.userData.userID != null && this.userData.userID != 0 && this.todayRecordID == 0) {
         // this.createActivity();
         // this.displayNotCompletedFields();
       // }
      }
    });
  }

  selectNotCompletedFields() {
    this.activityService.getSingleRecord(this.todayRecordID).subscribe({
      next: (record: any) => {
        console.log(record);
        this.completed = record.completed;
        if(record.steps != null) {
          this.steps = record.steps;
          this.stepsCompleted = true;
        }
        if(record.calories != null) {
          this.callories = record.calories;
          this.caloriesCompleted = true;
        }
        if(record.water != null) {
          this.water = record.water;
          this.waterCompleted = true;
        }
        if(record.sleepTime != null) {
          this.sleepTime = record.sleepTime;
          this.sleepCompleted = true;
        }

        this.getTrackedActivities();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.activityService.getTrainigs(this.todayRecordID).subscribe({
      next: (training) => {
        if(training.length !== 0) {
          this.trainingCompleted = true;
          console.log(training);
          this.getTrackedActivities();
        }
      } ,
      error: (err) => {
        console.log(err);
      }
    });
  }

  addScoresRecord() {
   const scores: ScoresModel =
   {
    Id: 0,
    ActivityDataID: this.todayRecordID,
    StepsScore: null,
    CaloriesScore: null,
    WaterScore: null,
    SleepScore: null,
    TotalScore: 0,
    UserID: this.userData.userID!
   }

   console.log(scores);

   this.scoreService.postScoresRecord(scores, this.todayRecordID).subscribe({
    next: (res: any) => {
      console.log(res);
    },
    error: (err) => {
      console.log(err);
    }
   });
  }

  updateTotalScore(score: number) {
    this.scoreService.putTotalScore(score, this.activityData.activityDataID!).subscribe({
      next: (res) => {
        console.log(res, 'added to total score');
        console.log('score = ', score);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getOverall() {
    this.scoreService.getTodayScoreRecord(this.activityData.activityDataID!).subscribe({
      next: (scores) => {
        console.log(scores.totalScore);
        console.log(scores);
        this.scoresData.caloriesScore = scores.caloriesScore;
        this.scoresData.sleepScore = scores.sleepScore;
        this.scoresData.waterScore = scores.waterScore;
        this.scoresData.stepsScore = scores.stepsScore;

        this.verifyPerfectDayAchievement();



        this.caloriesCompleted = true;
        this.sleepCompleted = true;
        this.trainingCompleted = true;
        this.waterCompleted = true;
        this.stepsCompleted = true;
        this.updateCompletedDayStatus();
        this.verifyDaysInRowAchievement();
        this.setDoneInfo();
        console.log('Training score: ', this.scoresData.trainingScore);

        console.log('example score: ', this.scoresData.stepsScore);
        this.notificationService.deleteNotifications(this.userData.userID!).subscribe({
          next: (res) => {
            console.log(res);
            if(res.status !== 204) {
              if(scores.caloriesScore != null) {
                this.createAndSaveNotification(this.userData.userID!, scores.id, 'calories');
              }
              if(scores.sleepScore != null) {
                this.createAndSaveNotification(this.userData.userID!, scores.id, 'sleep');
              }
              if(scores.stepsScore != null) {
                this.createAndSaveNotification(this.userData.userID!, scores.id, 'steps');
              }
              if(scores.waterScore != null) {
                this.createAndSaveNotification(this.userData.userID!, scores.id, 'water');
              }
            }
          },
          error: (err) => {
            console.log(err);
            if(this.userData.userID != null && this.userData.userID != 0) {
              if(scores.caloriesScore != null) {
                this.createAndSaveNotification(this.userData.userID!, scores.id, 'calories');
              }
              if(scores.sleepScore != null) {
                this.createAndSaveNotification(this.userData.userID!, scores.id, 'sleep');
              }
              if(scores.stepsScore != null) {
                this.createAndSaveNotification(this.userData.userID!, scores.id, 'steps');
              }
              if(scores.waterScore != null) {
                this.createAndSaveNotification(this.userData.userID!, scores.id, 'water');
              }
            }
          }
        });


        this.scoresData.totalScore = scores.totalScore;
        this.analyze.analyzeOverallScore();
        console.log('Overall:', this.scoresData.overallScore);
        this.addExperience();
        this.scoreService.putOverallScore(this.scoresData.overallScore!, this.activityData.activityDataID!).subscribe({
          next: (res) => {
            console.log(res);
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


  addExperience() {
    this.lvlData.experience += this.scoresData.overallScore!;
    if(this.lvlData.experience >= this.lvlData.nextLevelExperience) {
      this.lvlData.experience = this.lvlData.experience - this.lvlData.nextLevelExperience;
      this.lvlData.currentLevel++;
      this.lvlData.totalExperience += this.scoresData.overallScore!;
      this.lvlData.nextLevel = this.lvlData.currentLevel + 1;
      this.lvlData.nextLevelExperience = this.lvlData.getExpForLevel(this.lvlData.nextLevel);
    }

    this.lvlService.putExperience(this.userData.userID!, this.lvlData.experience).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.lvlService.putLevel(this.userData.userID!, this.lvlData.currentLevel).subscribe({
      next: (res) => {
        console.log(res);
        this.updateLevelAchievements();
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.lvlService.putNextLevelExperience(this.userData.userID!, this.lvlData.nextLevelExperience).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.lvlService.putTotalExperience(this.userData.userID!, this.lvlData.totalExperience).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addExperienceTest() {

    this.lvlData.experience += 100;
    if(this.lvlData.experience >= this.lvlData.nextLevelExperience) {
      this.lvlData.experience = this.lvlData.experience - this.lvlData.nextLevelExperience;
      this.lvlData.currentLevel++;
      this.lvlData.totalExperience += 100;
      this.lvlData.nextLevel = this.lvlData.currentLevel + 1;
      this.lvlData.nextLevelExperience = this.lvlData.getExpForLevel(this.lvlData.nextLevel);
    }

    this.lvlService.putExperience(this.userData.userID!, this.lvlData.experience).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.lvlService.putLevel(this.userData.userID!, this.lvlData.currentLevel).subscribe({
      next: (res) => {
        console.log(res);
        this.updateLevelAchievements();
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.lvlService.putNextLevelExperience(this.userData.userID!, this.lvlData.nextLevelExperience).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.lvlService.putTotalExperience(this.userData.userID!, this.lvlData.totalExperience).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  createAndSaveNotification(userID: number, resultsID: number, activityType: string) {
    var notificationTitle = this.notificationService.createNotificationTitle(activityType);
    var advice = this.notificationService.createAdvice(activityType);

    this.notificationService.postNotification(resultsID, this.userData.userID!, notificationTitle, advice, activityType).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpTrainingComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed, result:', result);
      this.activityService.postTraining(this.todayRecordID, result.duration, result.trainingType, result.heartRate).subscribe({
        next: (res) => {
          console.log('Training posted succesfully', res);
          this.analyze.analyzeTraining(result.duration, result.heartRate, result.trainingType);
          this.updateTotalScore(this.analyze.trainingScore);
         // this.updateTotalScore(this.scoresData.trainingScore!);
          console.log('total score: ', this.scoresData.totalScore);
          this.scoreService.putTrainingScore(this.todayRecordID).subscribe({
            next: (res) => {
              console.log(res);
              const itemToRemove = this.iconsToRender.find((icon: any) => icon.name === 'Trening') as { name: string; class: string; state: string } | undefined;
              this.selectNotCompletedFields();
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
    });
  }

  setTrainingScore() {
    this.activityService.getTrainigs(this.todayRecordID).subscribe({
      next: (training) => {
        if(training.length !== 0) {
          this.scoresData.trainingScore = training.trainingScore;
        }
      } ,
      error: (err) => {
        console.log(err);
      }
    });
  }

  setDoneInfo() {
    this.scoreService.getTodayScoreRecord(this.todayRecordID).subscribe({
      next: (scores) => {
        if(scores.overall != 0 && scores.overall != null) {
          this.done = true;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateLevelAchievements() {
    this.achievementService.verifyLevelAchievements(this.lvlData.currentLevel, this.userData.userID!).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  updateCompletedDayStatus() {
    this.activityService.completeDay(this.todayRecordID, this.userData.userID!).subscribe({
      next: (res) => {
        console.log(res);
        this.completed = true;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Achievements //////////////////////////////////////////////////////////////////////////////////////////////
  verifyStepsAchievement() {
    this.achievementService.verifyStepsAchievement(this.userData.userID!).subscribe({
      next: (totalSteps) => {
        console.log(totalSteps);
        if(totalSteps >= 100000)
          this.completeStepsAchievement();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  completeStepsAchievement() {
    this.achievementService.completeStepsAchievement(this.userData.userID!).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  verifyDaysInRowAchievement() {
    this.achievementService.verifyDaysInRowAchievement(this.userData.userID!).subscribe({
      next: (isCompleted) => {
        console.log(isCompleted);
        if(isCompleted == true) {
          this.completeDaysInRowAchievement();
        }
      }
    });
  }

  completeDaysInRowAchievement() {
    this.achievementService.completeDaysInRowAchievement(this.userData.userID!).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  verifyPerfectDayAchievement() {
    this.achievementService.verifyPerfectDayAchievement(this.userData.userID!).subscribe({
      next: (isCompleted) => {
        console.log(isCompleted);
        if(isCompleted == true) {
          this.completePerfectDayAchievement();
        }
      }
    });
  }

  completePerfectDayAchievement() {
    this.achievementService.completePerfectDayAchievement(this.userData.userID!).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
