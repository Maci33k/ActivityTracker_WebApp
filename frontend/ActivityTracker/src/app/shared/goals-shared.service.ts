import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoalsSharedService {

  constructor() { }

  caloriesGoal: number = 0;
  stepsGoal: number = 0;
  waterGoal: number = 0;
}
