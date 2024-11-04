import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoresSharedService {

  totalScore: number = 0;
  stepsScore?: number;
  waterScore?: number;
  sleepScore?: number;
  caloriesScore?: number;
  trainingScore?: number;
  overallScore?: number;
  nextSteps?: number;
  nextCalories?: number;
  nextWater?: number;
  nextSleep?: number;

  constructor() { }
}
