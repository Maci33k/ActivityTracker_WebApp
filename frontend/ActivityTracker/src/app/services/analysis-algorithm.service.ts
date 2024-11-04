import { Injectable } from '@angular/core';
import { ConfigSharedService } from '../shared/config-shared.service';
import { UserSharedService } from '../shared/user-shared.service';
import { ActivitySharedService } from '../shared/activity-shared.service';
import { GoalsSharedService } from '../shared/goals-shared.service';
import { ScoresSharedService } from '../shared/scores-shared.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisAlgorithmService {

  constructor(private configData: ConfigSharedService, private userData: UserSharedService, private activityData: ActivitySharedService,
              private goalsData: GoalsSharedService,
              private scoresData: ScoresSharedService
  ) { }

  totalScore: number = 0;
  stepsScore: number = 0;
  caloriesScore: number = 0;
  sleepScore: number = 0;
  waterScore: number = 0;
  trainingScore: number = 0;
  maxScore: number = 0;
  overallScore: number = 0;

  nextSteps: number = 0;
  nextCalories: number = 0;
  nextSleep: number = 0;
  nextWater: number = 0;


  analyzeSteps(steps: number) {
    if(this.goalsData.stepsGoal != 0 && this.goalsData.stepsGoal != null) {
      const result = (steps/this.goalsData.stepsGoal) * 100;
    if(result < 50) {
      this.stepsScore = 25;
      this.totalScore += 25;
      this.nextSteps = Math.floor(this.goalsData.stepsGoal/2)
    }
    if(result >= 50 && result < 75) {
      this.stepsScore = 50;
      this.totalScore += 50;
      this.nextSteps = Math.floor(this.goalsData.stepsGoal*0.75);
    }
    if(result >= 75 && result < 100) {
      this.stepsScore = 75;
      this.totalScore += 75;
      this.nextSteps = Math.floor(this.goalsData.stepsGoal);
    }
    if(result == 100) {
      this.stepsScore = 100;
      this.totalScore += 100;
      this.nextSteps = Math.floor(this.goalsData.stepsGoal);
    }
    return;
    }

    if(this.userData.age! >= 6 && this.userData.age! <= 17) {
      if(steps >= 12000) {
        this.totalScore += 100;
        this.stepsScore = 100;
        this.nextSteps = 12000;
      }
      if(steps >= 8000 && steps <= 11999) {
        this.totalScore += 75;
        this.stepsScore = 75;
        this.nextSteps = 12000;
      }
      if(steps >= 6000 && steps <= 7999) {
        this.totalScore += 50;
        this.stepsScore = 50;
        this.nextSteps = 8000;
      }
      if(steps < 6000) {
        this.totalScore += 25;
        this.stepsScore = 25;
        this.nextSteps = 6000;
      }
    }

    if(this.userData.age! >= 18) {
      if(steps >= 10000) {
        this.totalScore += 100;
        this.stepsScore = 100;
        this.nextSteps = 10000;
      }
      if(steps >= 8000 && steps <= 9999) {
        this.totalScore += 75;
        this.stepsScore = 75;
        this.nextSteps = 10000;
      }
      if(steps >= 5000 && steps <= 7999) {
        this.totalScore += 50;
        this.stepsScore = 50;
        this.nextSteps = 8000;
      }
      if(steps < 5000) {
        this.totalScore += 25;
        this.stepsScore = 25;
        this.nextSteps = 5000;
      }
    }
    console.log('next steps = ', this.nextSteps);
  }


  analyzeSleep(sleepTime: number) {
    if(this.userData.age! >= 6 && this.userData.age! <= 12) {
      if(sleepTime >= 540) {
      this.totalScore += 100;
      this.sleepScore = 100;
      this.nextSleep = 540;
    }

    if(sleepTime >= 420 && sleepTime <= 539) {
      this.totalScore += 75;
      this.sleepScore = 75;
      this.nextSleep = 540
    }

    if(sleepTime >= 360 && sleepTime <= 419) {
      this.totalScore += 50;
      this.sleepScore = 50;
      this.nextSleep = 420;
    }

    if(sleepTime < 360) {
      this.totalScore += 25;
      this.sleepScore = 25;
      this.nextSleep = 360;
    }
    }

    if(this.userData.age! >= 13 && this.userData.age! <= 18) {
      if(sleepTime >= 480)  {
      this.totalScore += 100;
      this.sleepScore = 100;
      this.nextSleep = 480;
    }

    if(sleepTime >= 420 && sleepTime <= 479)  {
      this.totalScore += 75;
      this.sleepScore = 75;
      this.nextSleep = 480;
    }

    if(sleepTime >= 360 && sleepTime <= 419) {
      this.totalScore += 50;
      this.sleepScore = 50;
      this.nextSleep = 420;
    }

    if(sleepTime < 360) {
      this.totalScore += 25;
      this.sleepScore = 25;
      this.nextSleep = 360;
    }
    }


    if(this.userData.age! >= 19) {
      if(sleepTime >= 420)  {
      this.totalScore += 100;
      this.sleepScore = 100;
      this.nextSleep = 420;
    }

    if(sleepTime >= 390 && sleepTime <= 419)  {
      this.totalScore += 75;
      this.sleepScore = 75;
      this.nextSleep = 420;
    }

    if(sleepTime >= 360 && sleepTime <= 389)  {
      this.totalScore += 50;
      this.sleepScore = 50;
      this.nextSleep = 390;
    }


    if(sleepTime < 360) {
      this.totalScore += 25;
      this.sleepScore = 25;
      this.nextSleep = 360;
    }
    }
  }

  analyzeWater(water: number) {
    console.log('user gender = ', this.userData.gender);
    console.log('user age = ', this.userData.age);
    if(this.goalsData.waterGoal != 0 && this.goalsData.waterGoal != null) {
      const result = (water/this.goalsData.waterGoal) * 100;
    if(result < 50) {
      this.waterScore = 25;
      this.totalScore += 25;
      this.nextWater = Math.floor(this.goalsData.waterGoal/2)
    }
    if(result >= 50 && result < 75) {
      this.waterScore = 50;
      this.totalScore += 50;
      this.nextWater = Math.floor(this.goalsData.waterGoal*0.75);
    }
    if(result >= 75 && result < 100) {
      this.waterScore = 75;
      this.totalScore += 75;
      this.nextWater = Math.floor(this.goalsData.waterGoal);
    }
    if(result == 100) {
      this.waterScore = 100;
      this.totalScore += 100;
      this.nextWater = Math.floor(this.goalsData.waterGoal);
    }
    return;
    }

    console.log(water);
    if(this.userData.age! >= 4 && this.userData.age! <= 8) {
      if(water >= 1.2) {
        this.waterScore = 100;
        this.totalScore += 100;
        this.nextWater = 1.2;
      }
      if(water >= 1 && water <= 1.199) {
        this.waterScore = 75;
        this.totalScore += 75;
        this.nextWater = 1.2;
      }
      if(water >= 0.9 && water <= 0.99) {
        this.waterScore = 50;
        this.totalScore += 50;
        this.nextWater = 1;
      }
      if(water < 0.9) {
        this.waterScore = 25;
        this.totalScore += 25;
        this.nextWater = 0.9;
      }
    }

    if(this.userData.age! >= 9 && this.userData.age! <= 13) {
      if(water >= 1.9) {
        this.waterScore = 100;
        this.totalScore += 100;
        this.nextWater = 1.9;
      }
      if(water >= 1.65 && water <= 1.89) {
        this.waterScore = 75;
        this.totalScore += 75;
        this.nextWater = 1.9;
      }
      if(water >= 1.4 && water <= 1.64) {
        this.waterScore = 50;
        this.totalScore += 50;
        this.nextWater = 1.65;
      }
      if(water < 1.4) {
        this.waterScore = 25;
        this.totalScore += 25;
        this.nextWater = 1.4;
      }
    }

    if(this.userData.age! >= 14 && this.userData.age! <= 18) {
      if(water >= 2.6) {
        this.waterScore = 100;
        this.totalScore += 100;
        this.nextWater = 2.6;
      }
      if(water >= 1.9 && water <= 2.59) {
        this.waterScore = 75;
        this.totalScore += 75;
        this.nextWater = 2.6;
      }
      if(water >= 1.6 && water <= 1.89) {
        this.waterScore = 50;
        this.totalScore += 50;
        this.nextWater = 1.9;
      }
      if(water < 1.6) {
        this.waterScore = 25;
        this.totalScore += 25;
        this.nextWater = 1.6;
      }
    }

    if(this.userData.age! >= 19 && this.userData.gender == 'men') {
      if(water >= 3) {
        this.waterScore = 100;
        this.totalScore += 100;
        this.nextWater = 3;
      }
      if(water >= 2.6 && water <= 2.99) {
        this.waterScore = 75;
        this.totalScore += 75;
        this.nextWater = 3;
      }
      if(water >= 2 && water < 2.6) {
        this.waterScore = 50;
        this.totalScore += 50;
        this.nextWater = 2.6;
      }
      if(water < 2) {
        this.waterScore = 25;
        this.totalScore += 25;
        this.nextWater = 2;
      }
    }

    if(this.userData.age! >= 19 && this.userData.gender == 'woman') {
      if(water >= 2.1) {
        this.waterScore = 100;
        this.totalScore += 100;
        this.nextWater = 2.1;
      }
      if(water >= 1.9 && water < 2.1) {
        this.waterScore = 75;
        this.totalScore += 75;
        this.nextWater = 2.1;
      }
      if(water >= 1.6 && water <= 1.89) {
        this.waterScore = 50;
        this.totalScore += 50;
        this.nextWater = 1.9;
      }
      if(water < 1.6) {
        this.waterScore = 25;
        this.totalScore += 25;
        this.nextWater = 1.6;
      }
    }
    console.log(this.waterScore);
  }

  analyzeCalories(calories: number) {
    if(this.goalsData.caloriesGoal != 0 && this.goalsData.caloriesGoal != null) {
    const result = (calories/this.goalsData.caloriesGoal) * 100;
    if(result < 50) {
      this.caloriesScore = 25;
      this.totalScore += 25;
      this.nextCalories = Math.floor(this.goalsData.caloriesGoal/2)
    }
    if(result >= 50 && result < 75) {
      this.caloriesScore = 50;
      this.totalScore += 50;
      this.nextCalories = Math.floor(this.goalsData.caloriesGoal*0.75);
    }
    if(result >= 75 && result < 100) {
      this.caloriesScore = 75;
      this.totalScore += 75;
      this.nextCalories = Math.floor(this.goalsData.caloriesGoal);
    }
    if(result == 100) {
      this.caloriesScore = 100;
      this.totalScore += 100;
      this.nextCalories = Math.floor(this.goalsData.caloriesGoal);
    }
  }
  else {
    if(this.configData.gender == 'men') {
     var BMR = 10*this.configData.weight + 6.25*this.configData.height - 5*this.userData.age! + 5;
     if(this.configData.fitness == 'low') {
      BMR *= 1.2;
     }
     if(this.configData.fitness == 'average') {
      BMR *= 1.375;
     }
     if(this.configData.fitness == 'high') {
      BMR *= 1.55;
     }
     const minCalories = BMR * 0.2;
     const optimalCalories = BMR * 0.25;
     const maxCalories = BMR * 0.3;
     if(calories < minCalories) {
      const result = 25;
      this.caloriesScore = 25;
      this.totalScore += 25;
      this.nextCalories = Math.floor(minCalories);
     }
     if(calories >= minCalories && calories < optimalCalories) {
      const result = 50;
      this.caloriesScore = 50;
      this.totalScore += 50;
      this.nextCalories = Math.floor(optimalCalories);
     }
     if(calories >= optimalCalories && calories < maxCalories) {
      const result = 75;
      this.caloriesScore = 75;
      this.totalScore += 75;
      this.nextCalories = Math.floor(maxCalories);
     }
     if(calories >= maxCalories) {
      const result = 100;
      this.caloriesScore = 100;
      this.totalScore += 100;
      this.nextCalories = Math.floor(maxCalories);
     }
    }
    if(this.configData.gender == 'woman') {
      var BMR = 10*this.configData.weight + 6.25*this.configData.height - 5*this.userData.age! + -161;
      if(this.configData.fitness == 'low') {
       BMR *= 1.2;
      }
      if(this.configData.fitness == 'average') {
       BMR *= 1.375;
      }
      if(this.configData.fitness == 'high') {
       BMR *= 1.55;
      }
      const minCalories = BMR * 0.2;
      const optimalCalories = BMR * 0.25;
      const maxCalories = BMR * 0.3;
      if(calories < minCalories) {
        const result = 25;
        this.caloriesScore = 25;
        this.totalScore += 25;
        this.nextCalories = Math.floor(minCalories);
       }
       if(calories >= minCalories && calories < optimalCalories) {
        const result = 50;
        this.caloriesScore = 50;
        this.totalScore += 50;
        this.nextCalories = Math.floor(optimalCalories);
       }
       if(calories >= optimalCalories && calories < maxCalories) {
        const result = 75;
        this.caloriesScore = 75;
        this.totalScore += 75;
        this.nextCalories = Math.floor(maxCalories);
       }
       if(calories >= maxCalories) {
        const result = 100;
        this.caloriesScore = 100;
        this.totalScore += 100;
        this.nextCalories = Math.floor(maxCalories);
       }
     }
  }
  }

  analyzeTraining(trainigTime: number, averageHeartRate: number, trainingType: string) { // source = https://stepzfitness.com.au/ideal-heart-rate-zones-gym-training-running-cardio-fitness-stepz-fitness/
    const maxHeartRate = 220 - this.userData.age!;
    if(trainingType == 'cardio') {
      const minHeartRate = Math.floor(maxHeartRate * 0.6);
      const minCardiovascularHeartRate = Math.floor(maxHeartRate * 0.7);
      const topHeartRate = Math.floor(maxHeartRate * 0.85);
        if(trainigTime != 0 && trainigTime != null) {
          this.trainingScore += 25;
        }
        if(trainigTime >= 30) {
          this.trainingScore += 25;
        }
        if(averageHeartRate >= minHeartRate && averageHeartRate < minCardiovascularHeartRate) {
          this.trainingScore += 25;
        }
        if(averageHeartRate >= minCardiovascularHeartRate && averageHeartRate <= topHeartRate) {
          this.trainingScore += 50;
        }
    }

    if(trainingType == 'strength') {
      const minHeartRate = Math.floor(maxHeartRate * 0.5);
      const topHeartRate = Math.floor(maxHeartRate * 0.7);
        if(trainigTime != 0) {
          this.trainingScore += 25;
        }
        if(trainigTime >= 30 && trainigTime < 45) {
          this.trainingScore += 25;
        }
        if(trainigTime >= 45 && trainigTime <= 90) {
          this.trainingScore += 50;
        }
        if(averageHeartRate >= minHeartRate && averageHeartRate <= topHeartRate) {
          this.trainingScore += 25;
        }
    }
    this.scoresData.trainingScore = this.trainingScore;



  }

  analyzeOverallScore() {
    //calculation of max possible score
    if(this.configData.calories == true)
      this.maxScore += 100;
    if(this.configData.sleepTime == true)
      this.maxScore += 100;
    if(this.configData.steps == true)
      this.maxScore += 100;
    if(this.configData.water == true)
      this.maxScore += 100;
    if(this.configData.training == true)
      this.maxScore += 100;
    this.overallScore = Math.floor((this.scoresData.totalScore / this.maxScore) * 100);
    this.scoresData.overallScore = this.overallScore;
  }

}
